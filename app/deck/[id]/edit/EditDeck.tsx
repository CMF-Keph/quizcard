'use client';

import { usePopup } from "@/app/hook/usePopup";
import { getDeckById, getCardsByDeckId } from "@/app/lib/idb";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CreatePopup from "./CreatePopup";
import EditCard from "./EditCard";
import { Deck } from "@/app/types";
import useCardsStore from "@/app/stores/card";
import { Plus, Trash2 } from "lucide-react";

interface EditDeckProps {
	deckId: string;
}

const EditDeck: React.FC<EditDeckProps> = ({deckId}) => {
  const { show } = usePopup();
  const cards = useCardsStore((state) => state.cards);
  const loadCards = useCardsStore((state) => state.loadCards);
  const router = useRouter();

  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const deck = await getDeckById(deckId);
        if (!mounted) return;
        if (!deck) {
          router.push('/');
          return;
        }
        setDeck(deck);
        loadCards(deckId);
      } 
      catch (err: any) {
        console.error('Error loading deck/cards:', err);
      }
      finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [deckId, router]);

  if (loading) return <div className="p-8 text-gray-300">Cargando...</div>;
  if (!deck) return null;

  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-8">
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col gap-2 w-10/12">
          <h1 className="text-4xl font-bold text-gray-100">{deck.name}</h1>
          <p className="text-gray-300 text-lg font-medium">{cards.length} tarjetas</p>
        </div>
        <div className="w-2/12 flex justify-end items-start">
          <button className="bg-red-700 font-semibold hover:bg-red-800 px-4 py-3 rounded-lg cursor-pointer w-auto text-white items-center flex gap-2"><Trash2 size={20} className="inline" /> Borrar mazo</button>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="px-4 py-2 gap-4 grid grid-cols-5 border border-gray-700 text-gray-300 font-semibold bg-gray-950 rounded-t-lg items-center">
          <p>Anverso</p>
          <p>Reverso</p>
          <p>Estado</p>
          <p>Etiquetas</p>
          <div className="flex justify-end">
            <button onClick={() => show(<CreatePopup deck={deck}></CreatePopup>, "Crear tarjeta")} className="hover:bg-green-800 cursor-pointer bg-green-700 p-2 text-xs rounded-lg"><Plus size={20} /></button>
          </div>
        </div>
        {cards.map((card) => <EditCard key={card.id} card={card}></EditCard>)}
      </div>
    </div>
  )
}

export default EditDeck