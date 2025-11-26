import { useForm } from "react-hook-form";
import { Deck } from "../types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteDeck } from "../lib/idb";
import { LoaderCircle } from "lucide-react";
import { usePopup } from "../hook/usePopup";
import useDecksStore from "../stores/deck";


interface DeleteDeckPopupProps {
	deck: Deck;
	shouldRedirect?: boolean;
}

const DeleteDeckPopup: React.FC<DeleteDeckPopupProps> = ({ deck, shouldRedirect = false }) => {
	const removeDeck = useDecksStore((state) => state.removeDeck);
	const loading = useDecksStore((state) => state.loading);

	const { hide } = usePopup();
	const router = useRouter();	
	const [isBlur, setIsBlur] = useState(false);
	const schema = z.object({
		confirmName: z
			.string()
			.min(1, "Escribe el nombre del mazo para confirmar")
			.refine((val) => val === deck.name, { message: "El nombre no coincide" }),
	});

	type FormValues = z.infer<typeof schema>;

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, dirtyFields },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { confirmName: "" },
		mode: "onChange",
	});

	const onSubmit = async (_: FormValues) => {
		await removeDeck(deck.id);

		if (shouldRedirect) router.push('');
		hide();
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<p className="text-gray-100 text-lg text-center">¿Estás seguro de borrar el mazo <span className="text-orange-600 font-semibold">{deck.name}</span>?</p>
				<p className="text-gray-300 text-center">Escribe el nombre del mazo para confirmarlo. ¡Esta acción es irreversible!</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<label htmlFor="deckDefaultEasiness" className="text-lg font-semibold flex flex-col h-8">
					Confirma el nombre del mazo
					<p id="confirm-error" className="text-xs text-red-400 font-normal mb-[3px]">
						{errors.confirmName && dirtyFields.confirmName && isBlur && errors.confirmName.message}
					</p>	
				</label>				
				<input
					type="text"
					placeholder="Introduce el nombre del mazo para borrarlo..."
					{...register("confirmName")}
					onBlur={() => setIsBlur(true)}
					className="outline-none disabled:text-gray-500 placeholder:text-gray-300 w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-lg"
					aria-invalid={!!errors.confirmName}
					aria-describedby={errors.confirmName && dirtyFields.confirmName && isBlur ? "confirm-error" : undefined}
				/>
				<button
					disabled={loading || !isValid}
					className="bg-red-800 hover:bg-red-900 text-center flex items-center justify-center p-2 rounded-lg cursor-pointer disabled:cursor-default disabled:opacity-50 disabled:hover:bg-red-800">
					{loading ? <LoaderCircle className="animate-spin" size={26} /> : "Borrar mazo"}
				</button>
			</form>
		</div>
	)
}

export default DeleteDeckPopup