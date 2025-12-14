'use client';

import { getCardsByDeckId, getCardsToStudyByDeckId, getDeckById, updateCard } from "@/app/lib/idb";
import { schedule } from "@/app/lib/scheduler";
import { Card, Deck } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface StudyDeckProps {
	deckId: string;
}

const StudyDeck: React.FC<StudyDeckProps> = ({ deckId }) => {	
	const router = useRouter();

	const [cards, setCards] = useState<Card[]>([]);
	const [deck, setDeck] = useState<Deck>();
	const [activeCard, setActiveCard] = useState<Card>();
	const [loading, setLoading] = useState(true);

	const setCardsDeck = (cards: Card[]) => {
		setCards(cards);
		setActiveCard(
			cards.sort((a, b) =>  new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())[0]
		);
	}

	const initializeStudy = async () => {
			setLoading(true);
			try {
				const deck = await getDeckById(deckId);				
				if (!deck) {
					router.push('/');
					return;
				}				
				setDeck(deck);

				const cards = await getCardsToStudyByDeckId(deckId);
				if(!cards) {
					router.push('/');
					return;
				}
				setCardsDeck(cards);				
			}
			catch (err: any) {
				console.error('Error loading deck/cards:', err);
			}
			finally {
				setLoading(false);
			}
		}

	useEffect(() => {		
		initializeStudy();
	}, [deckId, router]);

	const handleStudyCard = async (card: Card, quality: number) => {
		var cardToUpdate = schedule(card, quality);		
		var updatedCard = await updateCard(card.id, cardToUpdate);

		if (!updatedCard) {
			console.error("Couldn't retreive updated card");
			return;
		}

		var newDueDate = new Date(updatedCard.dueDate);
		var actualDate = new Date();

		if (newDueDate.getTime() > actualDate.getTime()) {
			var updatedCardsDeck = cards.filter(c => c.id !== updatedCard!.id);

			if (updatedCardsDeck.length === 0) {
				router.push('/');
				return;
			}
			
			setCardsDeck(updatedCardsDeck);
			return;
		}
		var updatedCardsDeck = cards.filter(c => c.id !== updatedCard!.id);
		updatedCardsDeck.push(updatedCard);
		setCardsDeck(updatedCardsDeck);
	}

	if (loading) return <div className="p-8 text-gray-300">Cargando...</div>;

	return (
		<div className="mx-auto max-w-7xl flex flex-col gap-8">
			<div className="flex flex-wrap w-full justify-between">
				<div className="flex flex-col gap-2 w-full">
					<h1 className="text-4xl font-bold text-gray-100">{deck!.name}</h1>
					<p className="text-gray-300 text-lg font-medium">1 de {cards.length} aprendidas</p>
				</div>
			</div>
			<div className="bg-gray-800 border border-gray-700 p-12 rounded-lg flex flex-col gap-3 w-full h-[calc(100vh-80px-96px-32px-76px)] items-center justify-between">
				<p className="text-gray-100 text-5xl font-medium">{activeCard?.front}</p>
				<div className="flex gap-2">
					<button onClick={() => handleStudyCard(activeCard!, 1)} className="w-30 bg-gray-900 rounded p-2 border border-gray-700 hover:bg-gray-950 cursor-pointer text-red-200">Difícil</button>
					<button onClick={() => handleStudyCard(activeCard!, 2)} className="w-30 bg-gray-900 rounded p-2 border border-gray-700 hover:bg-gray-950 cursor-pointer text-orange-200">Normal</button>
					<button onClick={() => handleStudyCard(activeCard!, 3)} className="w-30 bg-gray-900 rounded p-2 border border-gray-700 hover:bg-gray-950 cursor-pointer text-green-200">Muy fácil</button>
				</div>
			</div>
		</div>
	)
}

export default StudyDeck