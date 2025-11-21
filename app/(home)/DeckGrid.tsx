'use client';

import { useEffect, useState } from "react";
import { Deck } from "../types";
import { getDecks } from "../lib/idb";
import DeckCard from "../shared/DeckCard";

const DeckGrid = () => {
	const [decks, setDecks] = useState<Deck[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;

		async function load() {
			setLoading(true);
			try {
				const decks = await getDecks();
				if (!mounted) return;
				setDecks(decks);
			}
			catch (err: any) {
				console.error('Error loading deck/cards:', err);
			}
			finally {
				if (mounted) setLoading(false);
			}
		}

		load();

		return () => {
			mounted = false;
		};
	}, []);

	if (loading) return <div className="p-8 text-gray-300">Cargando...</div>;

	return (
		<>
			<div className="grid grid-cols-4 gap-4">
				<div className="bg-gray-800 border border-gray-700 p-6 rounded-lg flex flex-col gap-3">
					<p className="text-xl text-gray-100 font-semibold">Mazos</p>
					<span className="text-2xl text-orange-400 font-bold">{decks.length}</span>
				</div>
				<div className="bg-gray-800 border border-gray-700 p-6 rounded-lg flex flex-col gap-3">
					<p className="text-xl text-gray-100 font-semibold">Pendientes</p>
					<span className="text-2xl text-green-500 font-bold">2</span>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4">
				{decks.length === 0 && <p className="text-gray-400 col-span-3 text-center">No hay mazos creados</p>}
				{decks.map((deck) => <DeckCard key={deck.id} deck={deck}></DeckCard>)}
			</div>
		</>
	)
}

export default DeckGrid