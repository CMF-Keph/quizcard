import { IDBPDatabase, openDB } from "idb";
import { Card, Deck, State } from "../types";
import { v4 as uuidv4 } from 'uuid';

const DB_NAME = 'flashcardsDB';
const DB_VERSION = 1;
const DECKS_STORE = 'decks';
const CARDS_STORE = 'cards';

let dbPromise: Promise<IDBPDatabase> | null = null;

export const getDb = () => {
	if (!dbPromise) {
		dbPromise = openDB(DB_NAME, DB_VERSION, {
			upgrade(db) {
				// decks store
				if (!db.objectStoreNames.contains(DECKS_STORE)) {
					const decks = db.createObjectStore(DECKS_STORE, { keyPath: 'id' });
					decks.createIndex('name', 'name', { unique: false });
				}

				// cards store
				if (!db.objectStoreNames.contains(CARDS_STORE)) {
					const cards = db.createObjectStore(CARDS_STORE, { keyPath: 'id' });
					cards.createIndex('deckId', 'deckId', { unique: false });
					cards.createIndex('dueDate', 'dueDate', { unique: false });
					cards.createIndex('state', 'state', { unique: false });
				}
			},
		});
	}
	return dbPromise;
}

function nowIso(): string {
	return new Date().toISOString()
}

function ensureDeckDefaults(deck: Partial<Deck>): Deck {
	return {
		id: deck.id ?? uuidv4(),
		name: deck.name ?? 'New deck',
		description: deck.description,
		defaultEasiness: deck.defaultEasiness ?? 2.5,
		cardCount: deck.cardCount ?? 0,
		createdAt: deck.createdAt ?? nowIso(),
	};
}

function ensureCardDefaults(inCard: Partial<Card>): Card {
	const createdAt = inCard.createdAt ?? new Date().toUTCString();
	const deckId = inCard.deckId!;
	return {
		id: inCard.id ?? uuidv4(),
		deckId,
		easinessFactor: inCard.easinessFactor ?? 2.5,
		interval: inCard.interval ?? 0,
		repetitions: inCard.repetitions ?? 0,
		front: inCard.front ?? '',
		back: inCard.back ?? '',
		dueDate: inCard.dueDate ?? createdAt,
		createdAt,
		history: inCard.history ?? [],
		tags: inCard.tags ?? [],
		suspended: inCard.suspended ?? false,
		state: (inCard.state as State) ?? 'new',
		fails: inCard.fails ?? 0,
	};
}

export const getDeckById = async (deckId: string): Promise<Deck | undefined> => {
	const db = await getDb();
	return db.get(DECKS_STORE, deckId);
}

export const getDecks = async (): Promise<Deck[]> => {
	const db = await getDb();
	return db.getAll(DECKS_STORE);
}

export const getCardsByDeckId = async (deckId: string): Promise<Card[]> => {
	const db = await getDb();
	const tx = db.transaction(CARDS_STORE, 'readonly');
	const index = tx.objectStore(CARDS_STORE).index('deckId');
	const results = await index.getAll(IDBKeyRange.only(deckId));
	await tx.done;
	return results as Card[];
}

export const createDeck = async (payload: Partial<Deck>): Promise<Deck> => {
	const db = await getDb();
	const deck = ensureDeckDefaults(payload);

	await db.add(DECKS_STORE, deck);

	return deck;
}

export const createCard = async (payload: Partial<Card>): Promise<Card> => {
	const db = await getDb();
	const card = ensureCardDefaults(payload);	

	await db.add(CARDS_STORE, card);

	return card;
}

export const updateCard = async (cardId: string, patch: Partial<Card>): Promise<Card | null> => {
  const db = await getDb();
  const existing = await db.get(CARDS_STORE, cardId) as Card | undefined;
  if (!existing) return null;

  const merged: Partial<Card> = { ...existing, ...patch };
  const updated = ensureCardDefaults(merged);

  await db.put(CARDS_STORE, updated);
  return updated;
};

export const deleteDeck = async (dekcId: string): Promise<void> => {
	const db = await getDb();
	const tx = db.transaction([DECKS_STORE, CARDS_STORE], 'readwrite');
	
	const cardsIndex = tx.objectStore(CARDS_STORE).index('deckId');
	const cardsToDelete = await cardsIndex.getAllKeys(IDBKeyRange.only(dekcId));
	for (const cardId of cardsToDelete) {
		await tx.objectStore(CARDS_STORE).delete(cardId);
	}	

	await tx.objectStore(DECKS_STORE).delete(dekcId);
	
	await tx.done;	
}

export const seedFromUrl = async (jsonUrl: string): Promise<{ decks: number; cards: number }> => {
	// jsonUrl: debe apuntar a un JSON con keys { decks: Deck[], cards: Card[] }
	// Nota: la ruta por defecto es el path local que generamos antes; 
	// en entorno real necesitarás servir ese archivo como JSON o pasar otro URL.
	const resp = await fetch(jsonUrl);
	if (!resp.ok) throw new Error(`Failed to fetch seed data from ${jsonUrl}: ${resp.status}`);
	const data = await resp.json();
	const decksArr: Partial<Deck>[] = data.decks ?? [];
	const cardsArr: Partial<Card>[] = data.cards ?? [];

	const db = await getDb();
	const tx = (await db).transaction([DECKS_STORE, CARDS_STORE], 'readwrite');

	let decksInserted = 0;
	let cardsInserted = 0;

	for (const d of decksArr) {
		const deck = ensureDeckDefaults(d);
		await tx.objectStore(DECKS_STORE).put(deck);
		decksInserted++;
	}

	for (const c of cardsArr) {
		// ensure required deckId present; if not, skip or attach to first deck
		if (!c.deckId && decksArr.length > 0) c.deckId = (decksArr[0].id as string) ?? undefined;
		if (!c.deckId) continue;
		const card = ensureCardDefaults(c);
		await tx.objectStore(CARDS_STORE).put(card);
		cardsInserted++;
	}

	await tx.done;
	console.log(`Seeded DB with ${decksInserted} decks and ${cardsInserted} cards.`);
	return { decks: decksInserted, cards: cardsInserted };
}
