import { create } from "zustand";
import { Card } from "../types"
import { createCard, deleteCard, getCardsByDeckId, updateCard } from "../lib/idb";

type State = {
  cards: Card[];
  loading: boolean;
  loadCards: (deckId: string) => Promise<void>;
  setCards: (cards: Card[]) => void;
  updateCard: (cardId: string, card: Partial<Card>) => Promise<void>;
  createCard: (payload: Card) => Promise<Card>;
  deleteCard: (cardId: string) => Promise<void>;
}

const useCardsStore = create<State>((set, get) => ({
  cards: [],
  loading: false,
  loadCards: async (deckId: string) => {
    set({ loading: true });

    try {
      const cards = await getCardsByDeckId(deckId);
      set({ cards });
    }
    finally {
      set({ loading: false });
    }
  },
  updateCard: async (cardId: string, card: Partial<Card>) => {
    set({ loading: true });

    try {
      await updateCard(cardId, card);
    }
    finally {
      set({ loading: false });
    }
  },
  createCard: async (payload: Card) => {
    set({ loading: true });

    try {
      const card = await createCard(payload);
      return card;
    }
    finally {
      set({ loading: false });
    }
  },
  deleteCard: async (cardId: string) => {
    set({ loading: true });

    try {
      await deleteCard(cardId);
      set({ cards: get().cards.filter((card) => card.id !== cardId) });
    }
    finally {
      set({ loading: false });
    }
  },
  setCards: (cards: Card[]) => set({ cards: cards }),
}));

export default useCardsStore