'use client';

import { useEffect } from "react";
import { Deck } from "../types";
import DeckCard from "./DeckCard";
import useDecksStore from "../stores/deck";
import Link from "next/link";

const DeckGrid = () => {
	const decks = useDecksStore((state) => state.decks);
	const loading = useDecksStore((state) => state.loading);
	const loadDecks = useDecksStore((state) => state.loadDecks);

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
				{decks.length === 0 && <div className="border border-blue-700/25 h-24 w-full col-span-3 rounded-lg text-gray-100 bg-blue-600/10 flex items-center justify-center">
					<Link href="/deck/create" className="text-center bg-blue-600 p-3 rounded-lg font-semibold">¡Crea tu primer mazo!</Link>
				</div>}
				{decks.map((deck) => <DeckCard key={deck.id} deck={deck}></DeckCard>)}
			</div>
		</>
	)
}

export default DeckGrid