import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { GameID, Round } from '../types';

export function useRealtimeRounds(gameId: GameID | undefined): [Round[], Round | undefined] {
    const [gameRounds, setGameRounds] = useState<Round[]>([]);

    useEffect(() => {
        if (gameId) {
            const unsubscribeFromSnapshot = firebase.firestore()
                .collection('games')
                .doc(gameId)
                .collection('rounds')
                .orderBy('timestamp')
                .onSnapshot(function(querySnapshot) {
                    const rounds: Round[] = []
                    querySnapshot.forEach(function(doc) {
                        const round = { id: doc.id ,...doc.data()} as Round;
                        rounds.push(round);
                    });
                    setGameRounds(rounds);
                });
    
            return () => unsubscribeFromSnapshot();
        }
    }, [gameId]);

    const currentRound = gameRounds.length ? gameRounds[0] : undefined;

    return [gameRounds, currentRound];
}