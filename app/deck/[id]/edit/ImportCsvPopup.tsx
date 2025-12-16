'use client';

import { useState } from "react";
import { usePopup } from "@/app/hook/usePopup";
import useCardsStore from "@/app/stores/card";
import { Deck } from "@/app/types";
import { Upload } from "lucide-react";

interface ImportCsvPopupProps {
	deck: Deck;
}

export default function ImportCsvPopup({ deck }: ImportCsvPopupProps) {
	const { hide } = usePopup();
	const createCard = useCardsStore((s) => s.createCard);
	const loadCards = useCardsStore((s) => s.loadCards);

	const [rows, setRows] = useState<{ front: string; back: string }[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [dragActive, setDragActive] = useState(false);

	// Robust CSV line parser: handles malformed CSV with escaped quotes
	function parseLineCSV(line: string): string[] {
		// Replace "" (escaped quote) with a placeholder FIRST to avoid confusion
		const placeholder = '\x00ESCAPED_QUOTE\x00';
		line = line.replace(/""/g, placeholder);

		const cells: string[] = [];
		let current = '';
		let insideQuotes = false;

		// Split by commas outside of quotes
		for (let i = 0; i < line.length; i++) {
			const char = line[i];

			if (char === '"') {
				// Toggle quote state
				insideQuotes = !insideQuotes;
			} else if (char === ',' && !insideQuotes) {
				// Field separator (outside quotes)
				cells.push(current);
				current = '';
			} else {
				current += char;
			}
		}

		cells.push(current);

		// Clean up: trim, remove wrapping quotes, restore escaped quotes
		return cells.map(cell => {
			cell = cell.trim();
			// Remove leading/trailing quotes
			while ((cell.startsWith('"') || cell.startsWith("'")) && (cell.endsWith('"') || cell.endsWith("'"))) {
				if (cell.startsWith('"') && cell.endsWith('"')) {
					cell = cell.slice(1, -1);
				} else if (cell.startsWith("'") && cell.endsWith("'")) {
					cell = cell.slice(1, -1);
				} else {
					break;
				}
			}
			// Restore escaped quotes
			cell = cell.replace(new RegExp(placeholder, 'g'), '"');
			return cell.trim();
		});
	}

	function parseCsv(text: string): { front: string; back: string }[] {
		const lines = text.split(/\r?\n/);
		const rows: { front: string; back: string }[] = [];

		let start = 0;
		if (lines.length > 0) {
			const firstLine = lines[0];
			const firstCells = parseLineCSV(firstLine);
			const headerCols = firstCells.map(h => h.trim().toLowerCase());
			const hasHeader = headerCols.includes('front') || headerCols.includes('back');
			if (hasHeader) start = 1;
		}

		for (let i = start; i < lines.length; i++) {
			const line = lines[i].trim();
			if (!line) continue;
			const cells = parseLineCSV(line);
			const front = cells[0]?.trim() ?? '';
			const back = cells[1]?.trim() ?? '';
			if (front === '' && back === '') continue;
			rows.push({ front, back });
		}

		return rows;
	}

	const processFile = async (file: File) => {
		setError(null);
		try {
			const text = await file.text();
			const parsed = parseCsv(text);
			if (parsed.length === 0) setError('No se encontraron filas válidas. Asegúrate de que el CSV tiene al menos 2 columnas.');
			setRows(parsed);
		} catch (err) {
			console.error(err);
			setError('Error al leer el fichero. Verifica que sea un CSV válido.');
		}
	};

	const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		const file = e.dataTransfer.files?.[0];
		if (file && (file.type === "text/csv" || file?.name.endsWith(".csv"))) {
			processFile(file);
		} else {
			setError("Por favor, selecciona un fichero CSV");
		}
	};

	const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		await processFile(file);
	};

	const onImport = async () => {
		if (!deck) return;
		if (rows.length === 0) return;

		setLoading(true);
		try {
			for (const r of rows) {
				await createCard({ deckId: deck.id, front: r.front, back: r.back } as any);
			}
			await loadCards(deck.id);
			hide();
		} catch (err) {
			console.error('Import failed', err);
			setError('Fallo al importar');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<h3 className="text-lg font-semibold text-gray-100">Importar tarjetas desde CSV</h3>
				<p className="text-sm text-gray-400">Carga un fichero CSV con dos columnas: <span className="text-gray-200 font-medium">front</span> (pregunta) y <span className="text-gray-200 font-medium">back</span> (respuesta).</p>
				<p className="text-xs text-gray-500">Si tu CSV incluye cabecera, se detectará y se saltará automáticamente.</p>
			</div>

			{/* Drag & drop area */}
			<div
				onDragEnter={onDrag}
				onDragLeave={onDrag}
				onDragOver={onDrag}
				onDrop={onDrop}
				className={`border-2 border-dashed rounded-lg p-6 transition-all ${
					dragActive
						? 'border-blue-500 bg-blue-500/10'
						: 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
				}`}
			>
				<div className="flex flex-col items-center gap-3">
					<Upload size={32} className="text-gray-400" />
					<div className="text-center">
						<p className="text-gray-200 font-medium">Arrastra tu CSV aquí</p>
						<p className="text-sm text-gray-400">o</p>
					</div>
					<label className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors">
						Selecciona un fichero
						<input
							type="file"
							accept=".csv,text/csv"
							onChange={onFile}
							className="hidden"
						/>
					</label>
				</div>
			</div>

			{error && <p className="text-sm text-red-400 bg-red-400/10 px-3 py-2 rounded">{error}</p>}

			{rows.length > 0 && (
				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-300"><span className="font-semibold text-gray-100">{rows.length}</span> tarjeta{rows.length !== 1 ? 's' : ''} lista{rows.length !== 1 ? 's' : ''} para importar</p>
					</div>
					<div className="max-h-40 overflow-auto border border-gray-700 rounded p-3 bg-gray-800/50">
						{rows.slice(0, 20).map((r, i) => (
							<div key={i} className="flex gap-4 text-sm text-gray-200 py-2 border-b border-gray-700 last:border-b-0">
								<div className="w-1/2 truncate text-gray-300">{r.front}</div>
								<div className="w-1/2 truncate text-gray-400">→ {r.back}</div>
							</div>
						))}
						{rows.length > 20 && (
							<p className="text-xs text-gray-500 py-2 italic">y {rows.length - 20} más...</p>
						)}
					</div>
				</div>
			)}

			<div className="flex gap-2 justify-end pt-2">
				<button onClick={hide} className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">Cancelar</button>
				<button
					disabled={loading || rows.length === 0}
					onClick={onImport}
					className="bg-green-600 hover:bg-green-700 disabled:hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? '⏳ Importando...' : `✓ Importar ${rows.length} tarjeta${rows.length !== 1 ? 's' : ''}`}
				</button>
			</div>
		</div>
	);
}
