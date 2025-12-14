'use client';

import { getCardsByDeckId, getCardsToStudyByDeckId, getDeckById, updateCard } from "@/app/lib/idb";
import { schedule } from "@/app/lib/scheduler";
import { Card, Deck } from "@/app/types";
import next from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FinishDeckProps {
	deckId: string;
}

const FinishDeck: React.FC<FinishDeckProps> = ({ deckId }) => {
	const router = useRouter();

	const [nextReviewDate, setNextReviewDate] = useState<Date | null>(null);
	const [deck, setDeck] = useState<Deck>();	
	const [loading, setLoading] = useState(true);
	
	const initializeData = async () => {
		setLoading(true);
		try {
			const deck = await getDeckById(deckId);			
			if (!deck) {
				router.push('/');
				return;
			}
			setDeck(deck);
			
			const cards = await getCardsByDeckId(deckId);
			if (!cards) {
				router.push('/');
				return;
			}
			
			if (cards.filter(card => new Date(card.dueDate).getTime() <= new Date().getTime()).length > 0) {
				router.push(`/deck/${deckId}`);
				return;
			}

			var sortedCards = cards.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
			var nextReviewDate = sortedCards.length > 0 ? new Date(sortedCards[0].dueDate) : null;

			if(!nextReviewDate) {
				router.push('/');
				return;
			}

			setNextReviewDate(nextReviewDate);
		}
		catch (err: any) {
			console.error('Error loading deck/cards:', err);
		}
		finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		initializeData();
	}, [deckId, router]);	

	const minutesFromNow = (next: Date) => {
		const now = new Date();

		const diffMs = next.getTime() - now.getTime();
		return Math.floor(diffMs / (1000 * 60));
	}

	if (loading) return <div className="p-8 text-gray-300">Cargando...</div>;

	return (
		<div className="mx-auto max-w-7xl flex flex-col gap-8">
			<div className="flex flex-wrap w-full justify-between">
				<div className="flex flex-col gap-2 w-full">
					<h1 className="text-4xl font-bold text-gray-100">{deck!.name}</h1>					
				</div>
			</div>
			<div className="bg-gray-800 border border-gray-700 p-12 rounded-lg flex flex-col gap-3 w-full h-[calc(100vh-80px-96px-32px-76px)] items-center justify-between">
				<div className="flex-col flex gap-8 w-full text-center">
					<p className="text-3xl text-gray-100 font-semibold">¡Felicidades!</p>
					<div className="flex flex-col gap-2">
						<p className="text-gray-200 text-lg">Has completado todas las tarjetas de este mazo por ahora.</p>
						<p className="text-gray-200 text-lg">La próxima revisión es</p>						
						{nextReviewDate && <p className="bg-gray-800 p-4 text-5xl font-semibold text-green-200">en {minutesFromNow(nextReviewDate)} minutos</p>}
					</div>
				</div>
				<button onClick={() => router.push('/')} className="bg-gray-900 rounded p-2 border border-gray-700 hover:bg-gray-950 cursor-pointer text-gray-200">Volver a inicio</button>				
			</div>
		</div>
	)
}

export default FinishDeck