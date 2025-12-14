'use client';

import { Pencil, Trash2 } from "lucide-react";
import { Card, Deck } from "../types";
import Link from "next/link";
import { usePopup } from "../hook/usePopup";
import DeleteDeckPopup from "./DeleteDeckPopup";
import { useEffect, useState } from "react";
import { getCardsByDeckId, getCardsToStudyByDeckId } from "../lib/idb";

interface DeckCardProps {
	deck: Deck;
}

const DeckCard: React.FC<DeckCardProps> = ({ deck }) => {
	const { show } = usePopup();

	const [cards, setCards] = useState<Card[]>([]);
	const [pendingCards, setPendingCards] = useState<Card[]>([]);
	const [nextReviewDate, setNextReviewDate] = useState<Date | null>(null);
	const [msUntilReview, setMsUntilReview] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);

	const loadPendingCards = async () => {
		setLoading(true);
		var cards = await getCardsByDeckId(deck.id);
		var pendingCards = cards.filter((card) => new Date(card.dueDate).getTime() <= new Date().getTime());

		var sortedCards = cards.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
		var nextReviewDate = sortedCards.length > 0 ? new Date(sortedCards[0].dueDate) : null;
		setNextReviewDate(nextReviewDate);
		if (!nextReviewDate || pendingCards.length > 0) {
			setMsUntilReview(null);
		}
		else {
			const diffMs = nextReviewDate!.getTime() - new Date().getTime();
			setMsUntilReview(diffMs);
		}

		setCards(cards);
		setPendingCards(pendingCards);
		setLoading(false);
	}

	const updateMinutesUntilReview = async () => {
		if (!nextReviewDate) {
			return;
		}		

		const diffMs = nextReviewDate.getTime() - new Date().getTime();
		if (diffMs < 0) {
			setPendingCards(await getCardsToStudyByDeckId(deck.id));
			setNextReviewDate(null);
			setMsUntilReview(null);			
		}		
		setMsUntilReview(diffMs);
	}

	useEffect(() => {
		loadPendingCards();
	}, []);

	useEffect(() => {
		if (!msUntilReview) return;

		const interval = setInterval(() => {
			updateMinutesUntilReview();
		}, 1000);

		return () => clearInterval(interval);
	}, [msUntilReview]);

const formatRemainingTime = (ms: number, nextDate: Date): string => {  
	const SECOND = 1000;
  const MINUTE = 1000 * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  if (ms >= DAY && nextDate instanceof Date) {
    return nextDate.toLocaleDateString();
  }

  if (ms >= HOUR) {
    const hours = Math.floor(ms / HOUR);
    return `En ${hours} hora${hours !== 1 ? "s" : ""}`;
  }

  if (ms >= MINUTE) {
    const minutes = Math.floor(ms / MINUTE);
    return `En ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
  }

  const seconds = Math.max(1, Math.floor(ms / SECOND));
  return `En ${seconds} segundo${seconds !== 1 ? "s" : ""}`;
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
							<span className="text-gray-100 font-semibold">{((cards.length - pendingCards.length) / cards.length) * 100 || 0} %</span>
						</div>
						<div className="relative">
							<div className="w-full h-2 bg-gray-500 rounded-full"></div>
							<div className="absolute bg-blue-600 rounded-full left-0 top-0 h-2" style={{ width: ((cards.length - pendingCards.length) / cards.length) * 100 + '%' }}></div>
						</div>
					</div>
					{pendingCards.length > 0 ? <Link href={`/deck/${deck.id}`} className="text-center bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold text-lg cursor-pointer">Estudiar</Link> : msUntilReview && nextReviewDate ? <div title={`${nextReviewDate.toLocaleDateString()} ${nextReviewDate.toLocaleTimeString()}`} className="text-center bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold text-lg cursor-pointer opacity-50">{`${formatRemainingTime(msUntilReview, nextReviewDate)}`}</div> : <div className="text-center bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold text-lg cursor-pointer opacity-50">Añade cartas al mazo</div>}
				</>
			}
		</div>
	)
}

export default DeckCard