import StudyDeck from "./StudyDeck";

interface DeckProps {
  params: { id: string };
}

const Deck = async ({ params }: DeckProps) => {
	const { id } = await params;

	return <StudyDeck deckId={id} />;
}

export default Deck;