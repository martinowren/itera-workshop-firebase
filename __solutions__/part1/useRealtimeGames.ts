import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { Game } from '../types';

export function useRealtimeGames() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
            firebase.firestore()
            .collection('games').get().then(function(querySnapshot) {
                const games: Game[] = []
                querySnapshot.forEach(function(doc) {
                    const gameWithDocId = { id: doc.id ,...doc.data()} as Game;
                    games.push(gameWithDocId);
                });
                setGames(games);
            })
    }, []);

    return games;
}