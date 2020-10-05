import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { PlayerState, GameID } from '../../types';
import { AuthContextType } from '../../auth/AuthContext';

export function useRealtimePlayerStates(gameId: GameID | undefined, authContext: AuthContextType): [PlayerState[], PlayerState | undefined] {
    const [playerStates, setPlayerStates] = useState<PlayerState[]>([]);

    useEffect(() => {
        if (gameId) {
            const unsubscribeFromSnapshot = firebase.firestore()
                .collection('games')
                .doc(gameId)
                .collection('playerStates')
                .onSnapshot(function(querySnapshot) {
                    const states: PlayerState[] = []
                    querySnapshot.forEach(function(doc) {
                        const playerStateWithDocId = { username: doc.id ,...doc.data()} as PlayerState;
                        states.push(playerStateWithDocId);
                    });
                    setPlayerStates(states);
                });
    
            return () => unsubscribeFromSnapshot();
        }
    }, [gameId]);


    const yourPlayerState = playerStates.find((state) => {
        if (authContext.user && authContext.user.email) {
            return state.username === authContext.user.email
        }
        return false;
    });

    return [playerStates, yourPlayerState];
}