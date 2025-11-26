import { usePopup } from "@/app/hook/usePopup";
import useCardsStore from "@/app/stores/card"
import { Card } from "@/app/types";
import { LoaderCircle } from "lucide-react"
import { use } from "react";

interface DeletePopupProps {
	card: Card;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ card }) => {
	const { hide } = usePopup();
	const loading = useCardsStore((state) => state.loading);
	const deleteCard = useCardsStore((state) => state.deleteCard);


	const handleOnDelete = async () => {
		deleteCard(card.id);
		hide();
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<p className="text-gray-100 text-lg text-center">¿Estás seguro de borrar la tarjeta?</p>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<button
					onClick={hide}
					disabled={loading}
					className="bg-gray-900 hover:bg-gray-800 text-center flex items-center justify-center p-2 rounded-lg cursor-pointer disabled:cursor-default disabled:opacity-50 disabled:hover:bg-gray-900">
					Cancelar
				</button>
				<button
					onClick={handleOnDelete}
					disabled={loading}
					className="bg-red-800 hover:bg-red-900 text-center flex items-center justify-center p-2 rounded-lg cursor-pointer disabled:cursor-default disabled:opacity-50 disabled:hover:bg-red-800">
					{loading ? <LoaderCircle className="animate-spin" size={26} /> : "Borrar tarjeta"}
				</button>
			</div>
		</div>
	)
}

export default DeletePopup