'use client';

import { seedFromUrl } from "../lib/idb";

const SeedButton = () => {

	const seedDb = async () => {
		console.log('asd');
		await seedFromUrl('./seed.json');
	}

	return (
		<button onClick={seedDb} className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg cursor-pointer">Seed</button>
	)
}

export default SeedButton