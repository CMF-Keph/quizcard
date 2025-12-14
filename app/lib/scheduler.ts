import { Card } from "../types";

export const schedule = (card: Card, quality: number): Card => {
	var newCard = {...card};	
	if (quality < 2) {
		newCard.interval = 0.002;
		newCard.repetitions = 0;
	}
	else {
		if (card.repetitions === 0) newCard.interval = 0.02;
		if (card.repetitions === 1) newCard.interval = 1;
		if (card.repetitions === 2) newCard.interval = 3;
		if (card.repetitions >= 3) newCard.interval  = card.interval * card.easinessFactor;
		newCard.repetitions += 1;
	}

	const diff = 2 - quality;
	const delta = 0.1 - diff * (0.08 + diff * 0.02);
	newCard.easinessFactor = card.easinessFactor + delta;

	if (newCard.easinessFactor < 1.3) {
		newCard.easinessFactor = 1.3;
	}

	const now = new Date();
	const msToAdd = newCard.interval * 24 * 60 * 60 * 1000;
	const dueDate = new Date(now.getTime() + msToAdd);

	console.log(now, msToAdd, dueDate);
	newCard.dueDate = dueDate.toISOString();
		
	return newCard;
}