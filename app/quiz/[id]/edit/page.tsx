'use client';

import { usePopup } from "@/app/hook/usePopup";
import CreatePopup from "./CreatePopup";
import EditCard from "./EditCard";
import { Card } from "@/app/types";

const Edit = () => {
  const { show } = usePopup();

  const CARDS: Card[] = [
    {
      id: "1",
      deckId: "1",
      easinessFactor: 2.5,
      interval: 2,
      repetitions: 2,
      front: "わたし",
      back: "Yo (formal)",
      dueDate: new Date().toUTCString(),
      createdAt: new Date().toUTCString(),
      history: [],
      tags: ["Tema 1", "Minna no Nihongo"],
      state: "new"
    },
    {
      id: "2",
      deckId: "1",
      easinessFactor: 2.5,
      interval: 2,
      repetitions: 2,
      front: "わたし",
      back: "Yo (formal)",
      dueDate: new Date().toUTCString(),
      createdAt: new Date().toUTCString(),
      history: [],
      tags: ["Tema 1", "Minna no Nihongo"],
      state: "new"
    }
  ]

  return (
    <div className="mx-auto max-w-7xl flex flex-col gap-8">
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col gap-2 w-10/12">
          <h1 className="text-4xl font-bold text-gray-100">Título</h1>
          <p className="text-gray-300 text-lg font-medium">34 cartas</p>
        </div>
        <div className="w-2/12 text-right">
          <button className="bg-red-700 font-semibold hover:bg-red-800 px-4 py-3 rounded-lg cursor-pointer w-auto text-white">Borrar Quiz</button>
        </div>
      </div>      
      <div className="flex flex-col w-full">
        <div className="px-4 py-2 gap-4 grid grid-cols-5 border border-gray-700 text-gray-300 font-semibold bg-gray-950 rounded-t-lg items-center">
          <p>Anverso</p>
          <p>Reverso</p>
          <p>Estado</p>
          <p>Etiquetas</p>
          <div className="flex justify-end">
            <button onClick={() => show(<CreatePopup></CreatePopup>, "Crear tarjeta")} className="hover:bg-green-800 cursor-pointer bg-green-700 p-2 text-xs rounded-lg">Añadir</button>
          </div>
        </div>
        {CARDS.map((card) => <EditCard key={card.id} card={card}></EditCard>)}        
      </div>
    </div>
  )
}

export default Edit