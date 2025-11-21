import { Card } from "@/app/types";
import EditPopup from "./EditPopup";
import { usePopup } from "@/app/hook/usePopup";

interface EditCardProps {
	card: Card;
}

const EditCard: React.FC<EditCardProps> = ({card}) => {
	const { show } = usePopup();

	return (
		<div className="grid grid-cols-5 border-b even:bg-gray-800 border-x p-4 gap-4 last:rounded-b-lg border-gray-700 text-gray-100 text-medium bg-gray-900 items-center">
			<p>{card.front}</p>
			<p>{card.back}</p>
			<p>{card.state}</p>
			<p className="flex gap-2 overflow-hidden">
				{card.tags.map((tag) => <span key={tag} className="max-w-13 whitespace-nowrap overflow-hidden text-ellipsis bg-gray-700 text-gray-100 p-1 rounded text-sm">{tag}</span>)}					
			</p>
			<p className="flex gap-2 justify-end">
				<button onClick={() => show(<EditPopup></EditPopup>, "Editar tarjeta")} className="hover:bg-blue-800 cursor-pointer bg-blue-700 p-2 text-xs rounded-lg">Editar</button>
				<button className="hover:bg-red-800 cursor-pointer bg-red-700 p-2 text-xs rounded-lg">Borrar</button>
			</p>
		</div>
	)
}

export default EditCard