'use client';

import { Pencil, Trash2 } from "lucide-react";
import { Card, Deck } from "../types";
import Link from "next/link";
import { usePopup } from "../hook/usePopup";
import DeleteDeckPopup from "./DeleteDeckPopup";
import { useEffect, useState } from "react";
import { getCardsByDeckId } from "../lib/idb";

interface DeckCardProps {
	deck: Deck;
}

const DeckCard: React.FC<DeckCardProps> = ({ deck }) => {
	const { show } = usePopup();

	const [cards, setCards] = useState<Card[]>([]);
	const [pendingCards, setPendingCards] = useState<Card[]>([]);
	const [nextReviewDate, setNextReviewDate] = useState<Date | null>(null);
	const [loading, setLoading] = useState(true);

	const loadPendingCards = async () => {
		setLoading(true);
		var cards = await getCardsByDeckId(deck.id);
		var pendingCards = cards.filter((card) => new Date(card.dueDate).getTime() <= new Date().getTime());

		var sortedCards = cards.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
		var nextReviewDate = sortedCards.length > 0 ? new Date(sortedCards[0].dueDate) : null;

		setCards(cards);
		setPendingCards(pendingCards);
		setNextReviewDate(nextReviewDate);		
		setLoading(false);
	}

	useEffect(() => {
		loadPendingCards();
	}, []);

	const minutesFromNow = (next: Date) => {
		const now = new Date();

		const diffMs = next.getTime() - now.getTime();
		return Math.floor(diffMs / (1000 * 60));
	}

	return (
		<div className="bg-gray-800 border border-gray-700 p-6 rounded-lg flex flex-col gap-4">
			{!loading &&
				<>
					<div className="flex justify-between items-start">
						<div className="gap-1 flex flex-col">
							<p className="text-xl font-semibold">{deck.name}</p>
							<span className="text-gray-400">{pendingCards.length === 0 ? 'Al día' : `${pendingCards.length} revisiones`}</span>
						</div>
						<div className="flex gap-4">
							<Link href={`/deck/${deck.id}/edit`} className="hover:text-gray-500 text-xl text-gray-400 font-semibold cursor-pointer"><Pencil></Pencil></Link>
							<button onClick={() => show(<DeleteDeckPopup deck={deck}></DeleteDeckPopup>)} className="hover:text-gray-500 text-xl text-gray-400 font-semibold cursor-pointer"><Trash2></Trash2></button>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex justify-between">
							<p className="text-gray-400">Progreso</p>
							<span className="text-gray-100 font-semibold">{((cards.length - pendingCards.length) / cards.length) * 100} %</span>
						</div>
						<div className="relative">
							<div className="w-full h-2 bg-gray-500 rounded-full"></div>
							<div className="absolute bg-blue-600 rounded-full left-0 top-0 h-2" style={{ width: ((cards.length - pendingCards.length) / cards.length) * 100 + '%' }}></div>
						</div>
					</div>
					{pendingCards.length > 0 ? <Link href={`/deck/${deck.id}`} className="text-center bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold text-lg cursor-pointer">Estudiar</Link> : nextReviewDate ? <div className="text-center bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold text-lg cursor-pointer opacity-50">{`En ${minutesFromNow(nextReviewDate!)} minutos`}</div> : <div className="text-center bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold text-lg cursor-pointer opacity-50">Añade cartas al mazo</div>}
				</>
			}
		</div>
	)
}

export default DeckCard