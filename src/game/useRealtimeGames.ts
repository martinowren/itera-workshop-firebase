import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { Game } from '../types';

export function useRealtimeGames() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const unsubscribeFromSnapshot = firebase.firestore()
            .collection('games')
            .onSnapshot(function(querySnapshot) {
                const games: Game[] = []
                querySnapshot.forEach(function(doc) {
                    const gameWithDocId = { id: doc.id ,...doc.data()} as Game;
                    games.push(gameWithDocId);
                });
                setGames(games);
            });

        return () => unsubscribeFromSnapshot();
    }, []);

    return games;
}
    

