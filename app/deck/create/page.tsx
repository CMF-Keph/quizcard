'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Deck } from "@/app/types";
import { LoaderCircle } from "lucide-react";
import useDecksStore from "@/app/stores/deck";

const Create = () => {
  const createDeck = useDecksStore((state) => state.createDeck);
  const loading = useDecksStore((state) => state.loading);

  const router = useRouter();

  const schema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(50, "Máx 50 caracteres"),
    description: z.string().max(500, "Máx 500 caracteres").optional().or(z.literal("")),
    defaultEasiness: z.number().min(1, "Valor mínimo 1").max(5, "Valor máximo 5"),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", description: "", defaultEasiness: 2.5 },
  });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      name: data.name,
      description: data.description || "",
      defaultEasiness: data.defaultEasiness
    } as Deck;

    var deck = await createDeck(payload);

    router.push(`/deck/${deck.id}/edit`);
  }

  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-8">
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex flex-col gap-2 w-6/12">
          <h1 className="text-4xl font-bold text-gray-100">Crea un nuevo mazo</h1>
          <p className="text-gray-300 text-lg font-medium">¡Rellena los campos y listo!</p>
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-6/12 text-gray-100" noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="deckName" className="text-lg font-semibold">Nombre del mazo</label>
            <input
              type="text"
              {...register("name")}
              id="deckName"
              placeholder="Ej: Japonés - Minna no Nihongo"
              className="disabled:text-gray-500 placeholder:text-gray-300 w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-lg"
              aria-invalid={!!errors.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="deckDescription" className="text-lg font-semibold">Descripción <span className="text-sm text-gray-400">(opcional)</span></label>
            <textarea
              id="deckDescription"
              {...register("description")}
              placeholder="Mazo para estudiar el volabulario del Minna no Nihongo 1"
              className="disabled:text-gray-500 placeholder:text-gray-300 w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-lg max-h-26 min-h-12"
              aria-invalid={!!errors.description}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="deckDefaultEasiness" className="text-lg font-semibold">Facilidad inicial</label>
            <input
              type="number"
              id="deckDefaultEasiness"
              {...register("defaultEasiness")}
              value={2.5}
              placeholder="Ej: 2,5"
              disabled
              step={0.1}
              className="disabled:text-gray-500 placeholder:text-gray-300 w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-lg"
              aria-invalid={!!errors.defaultEasiness}
            />
          </div>
          <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded cursor-pointer w-full text-center flex justify-center items-center">
            {loading ? <LoaderCircle className="animate-spin" size={20} /> : "Crear mazo"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Create