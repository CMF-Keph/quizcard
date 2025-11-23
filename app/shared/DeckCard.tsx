'use client';

import { Pencil, Trash2 } from "lucide-react";
import { Deck } from "../types";
import Link from "next/link";
import { usePopup } from "../hook/usePopup";
import DeleteDeckPopup from "./DeleteDeckPopup";

interface DeckCardProps {
	deck: Deck;
}

const DeckCard: React.FC<DeckCardProps> = ({ deck }) => {
	const { show } = usePopup();

	return (
		<div className="bg-gray-800 border border-gray-700 p-6 rounded-lg flex flex-col gap-4">
			<div className="flex justify-between items-start">
				<div className="gap-1 flex flex-col">
					<p className="text-xl font-semibold">{deck.name}</p>
					<span className="text-gray-400">{deck.cardCount} revisiones</span>
				</div>
				<div className="flex gap-4">
					<Link href={`/deck/${deck.id}/edit`} className="hover:text-gray-500 text-xl text-gray-400 font-semibold cursor-pointer"><Pencil></Pencil></Link>
					<button onClick={() => show(<DeleteDeckPopup deck={deck}></DeleteDeckPopup>)} className="hover:text-gray-500 text-xl text-gray-400 font-semibold cursor-pointer"><Trash2></Trash2></button>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex justify-between">
					<p className="text-gray-400">Progreso</p>
					<span className="text-gray-100 font-semibold">77 %</span>
				</div>
				<div className="relative">
					<div className="w-full h-2 bg-gray-500 rounded-full"></div>
					<div className="absolute w-[77%] bg-blue-600 rounded-full left-0 top-0 h-2"></div>
				</div>
			</div>
			<div className="flex justify-between items-center">
				<p className="text-gray-400">Revisión en <span className="text-orange-400">2 horas</span></p>
			</div>
			<Link href={`/deck/${deck.id}`} className="text-center bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold text-lg cursor-pointer">Estudiar</Link>
		</div>
	)
}

export default DeckCard