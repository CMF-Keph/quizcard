import { create } from "zustand";
import { Deck } from "../types"
import { createDeck, deleteDeck, getDecks } from "../lib/idb";

type State = {
	decks: Deck[];
	loading: boolean;
	loadDecks: () =>  Promise<void>;
  createDeck: (payload: Deck) => Promise<Deck>;
	removeDeck: (deckId: string) => Promise<void>;
	setDecks: (decks: Deck[]) => void;
}

const useDecksStore = create<State>((set, get) => ({
  decks: [],
  loading: false,
  loadDecks: async () => {
    set({ loading: true });

    try {
      const decks = await getDecks();
      set({ decks });
    } 
		finally {
      set({ loading: false });
    }
  },
  createDeck: async (payload: Deck) => {
    set({ loading: true });

    try {
      var deck = await createDeck(payload);
      return deck;
    } 
    finally {      
      set({ loading: false });
    }
  },
  removeDeck: async (deckId: string) => {
    set({ loading: true });
		
    try {
      await deleteDeck(deckId);
      set({ decks: get().decks.filter((d) => d.id !== deckId) });
    } 
		finally {
      set({ loading: false });
    }
  },
  setDecks: (decks: Deck[]) => set({ decks: decks }),
}));

export default useDecksStore