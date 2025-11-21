import { Pencil, Trash2 } from "lucide-react";
import { Deck } from "../types";

interface DeckCardProps {
	deck: Deck;
}

const DeckCard: React.FC<DeckCardProps> = ({ deck }) => {
	function getPendingCards(deckId: string): string {
		return "";
	}

	return (
		<div className="bg-gray-800 border border-gray-700 p-6 rounded-lg flex flex-col gap-4">
			<div className="flex justify-between items-start">
				<div className="gap-1 flex flex-col">
					<p className="text-xl font-semibold">{deck.name}</p>
					<span className="text-gray-400">{getPendingCards(deck.id)} a revisar</span>
				</div>
				<div className="flex gap-4">
					<button className="text-xl text-gray-400 font-semibold cursor-pointer"><Pencil /></button>
					<button className="text-xl text-gray-400 font-semibold cursor-pointer"><Trash2 /></button>
				</div>
			</div>
		</div>
	)
}

export default DeckCard