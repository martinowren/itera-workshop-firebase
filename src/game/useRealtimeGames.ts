/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { Game } from '../types';

export function useRealtimeGames() {
	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		const snapShot = firebase
			.firestore()
			.collection('games')
			.onSnapshot((query) => {
				const games: Game[] = [];
				query.forEach((doc) => {
					const gameWithDocId = { id: doc.id, ...doc.data() } as Game;
					games.push(gameWithDocId);
				});
				setGames(games);
			});

		return () => snapShot();
	}, []);

	return games;
}
