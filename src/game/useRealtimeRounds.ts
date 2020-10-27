/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { GameID, Round } from '../types';

export function useRealtimeRounds(
	gameId: GameID | undefined
): [Round[], Round | undefined] {
	const [gameRounds, setGameRounds] = useState<Round[]>([]);

	useEffect(() => {
		if (gameId) {
			const snapShot = firebase
				.firestore()
				.collection('games')
				.doc(gameId)
				.collection('rounds')
				.onSnapshot((query) => {
					const allRounds: Round[] = [];
					query.forEach((document) => {
						const singleRound = {
							id: document.id,
							...document.data(),
						} as Round;
						allRounds.push(singleRound);
					});
					setGameRounds(allRounds);
				});

			return () => snapShot();
		}
	}, [gameId]);

	const currentRound = gameRounds.length ? gameRounds[0] : undefined;

	return [gameRounds, currentRound];
}
