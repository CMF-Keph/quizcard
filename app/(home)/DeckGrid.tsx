'use client';

import { useEffect } from "react";
import DeckCard from "./DeckCard";
import useDecksStore from "../stores/deck";
import Link from "next/link";

const DeckGrid = () => {
	const { decks, loading, loadDecks } = useDecksStore();

	useEffect(() => {
		let mounted = true;
		async function load() {			
			if (!mounted) return;
			await loadDecks();			
		}

		load();

		return () => {
			mounted = false;
		};
	}, [loadDecks]);

	if (loading) return <div className="p-8 text-gray-300">Cargando...</div>;

	return (					
		<div className="grid grid-cols-3 gap-4">
			{decks.length === 0 && <div className="border border-blue-700/25 h-24 w-full col-span-3 rounded-lg text-gray-100 bg-blue-600/10 flex items-center justify-center">
				<Link href="/deck/create" className="text-center bg-blue-600 p-3 rounded-lg font-semibold">¡Crea tu primer mazo!</Link>
			</div>}
			{decks.map((deck) => <DeckCard key={deck.id} deck={deck}></DeckCard>)}
		</div>		
	)
}

export default DeckGrid