'use client';

import { usePopup } from "@/app/hook/usePopup";
import useCardsStore from "@/app/stores/card";
import { Card, Deck } from "@/app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface CreatePopupProps {
  deck: Deck;
}

const CreatePopup: React.FC<CreatePopupProps> = ({deck}) => {
  const schema = z.object({
    front: z.string().min(1, "Debe tener al menos un caracter").max(256, "No debe sobrepasar los 256 caracteres"),
    back: z.string().min(1, "Debe tener al menos un caracter").max(256, "No debe sobrepasar los 256 caracteres"),
    tags: z.array(z.string().min(1)).max(3, "Solo puedes poner 3 etiquetas máximo").optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { front: "", back: "", tags: [] },
  });

  const { hide } = usePopup();
  const createCard = useCardsStore((state) => state.createCard );
  const loadCards = useCardsStore((state) => state.loadCards );

  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValue("tags", tags);
    trigger("tags");
  }, [tags, setValue, trigger]);

  const addTag = (raw: string) => {
    const tag = raw.trim();

    if (!tag) return;
    if (tags.includes(tag)) return;
    if (tags.length >= 3) return;

    setTags((tags) => [...tags, tag]);
    setInput("");
  };

  const removeTag = (idx: number) => {
    setTags((tag) => tag.filter((_, index) => index !== idx));
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      console.log('dasd');
      removeTag(tags.length - 1);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const payload = {
      deckId: deck.id,
      front: data.front,
      back: data.back,
      tags: data.tags,      
    } as Card;

    await createCard(payload);
    await loadCards(deck.id);

    hide();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full text-gray-100">
      <div className="flex flex-col gap-2">
        <label htmlFor="front" className="text-lg font-semibold">Anverso</label>
        <input type="text" {...register("front")} id="front" placeholder="Piscina" className="disabled:text-gray-500 placeholder:text-gray-500 w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-lg"></input>
        {errors.front && <p className="text-sm text-red-400 ">{errors.front.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="back" className="text-lg font-semibold">Reverso</label>
        <input type="text" {...register("back")} id="back" placeholder="Pool" className="disabled:text-gray-500 placeholder:text-gray-500 w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-lg"></input>
        {errors.back && <p className="text-sm text-red-400 ">{errors.back.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="back" className="text-lg font-semibold">Etiquetas</label>
        <div
          className={`flex flex-wrap items-center gap-2 p-2 rounded-lg border ${errors.tags ? "border-red-500" : "border-gray-700"} bg-gray-800/50`}
          onClick={() => inputRef.current?.focus()}
        >
          {tags.map((tags, index) => (
            <span key={tags} className="flex items-center gap-2 bg-gray-700 text-sm text-gray-100 px-2 rounded">
              <span>{tags}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="text-gray-300 cursor-pointer hover:text-white rounded focus:outline-none"
                aria-label={`Eliminar etiqueta ${tags}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={tags.length >= 3 ? "" : "Añadir etiqueta"}
            className="flex-1 min-w-[120px] bg-transparent text-lg outline-none placeholder:text-gray-500 text-gray-100"
            disabled={tags.length >= 3}
            aria-invalid={!!errors.tags}
          />
        </div>
        {errors.tags && (
          <p className="text-sm text-red-400">
            {Array.isArray(errors.tags) ? errors.tags[0]?.message ?? String(errors.tags) : (errors.tags as any).message}
          </p>
        )}
        <p className="text-sm text-gray-400">Máximo 3 (pulsa Enter para añadir)</p>
      </div>

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded cursor-pointer w-full">
        Crear tarjeta
      </button>
    </form>
  )
}

export default CreatePopup