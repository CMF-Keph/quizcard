import FinishDeck from "./FinishDeck";

interface FinishProps {
  params: { id: string };
}

const Finish = async ({ params }: FinishProps) => {
	const { id } = await params;

	return <FinishDeck deckId={id} />;
}

export default Finish;