import EditDeck from "./EditDeck";

interface EditProps {
  params: { id: string };
}

const Edit: React.FC<EditProps> = async ({ params }: EditProps) => {
  const { id } = await params;

  return <EditDeck deckId={id} />;
}

export default Edit