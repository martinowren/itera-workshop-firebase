import firebase from 'firebase';
import { Game, GameID, PlayerState, Round } from '../../types';

/**
 * CRUD for game documents
 */
export function addGame (game: Game) {
    return firebase.firestore().collection('games').add(game)
        .then((resp) => {
            return "Success"
        }).catch((error: Error) => {
            throw error;
        });
}

export function getGame (id: string) {
    const gameDocRef = firebase.firestore().collection('games').doc(id);
    
    return gameDocRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                return docSnapshot.data() as Game;
            } else {
                return null
            }
        });
}

export function updateGame (id: string, gameData: Partial<Game>) {
    if (!id) return Promise.reject('cannot get document without an id');
    const gameDocRef = firebase.firestore().collection('games').doc(id);
    return gameDocRef.update(gameData)
        .then(()=> true)
        .catch((error: Error) => {
            throw error;
        });
}

export function deleteGame (id: string) {
    if (!id) return Promise.reject('cannot delete document without an id');
    const gameDocRef = firebase.firestore().collection('games').doc(id);

    return gameDocRef.delete()
        .then(()=> true)
        .catch((error: Error) => {
            throw error;
        });
}


/**
 * CRUD for round documents
 */
export function addRound(gameId: string, round: Round) {
    const gameDocRef = firebase.firestore().collection('games').doc(gameId);

    return firebase.firestore()
        .collection('games')
        .doc(gameId)
        .collection('rounds')
        .add({
            ...round,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
}


/**
 * CRUD for player state documents
 */
export function addPlayerState (gameId: GameID, playerState: PlayerState) {
    return firebase.firestore()
        .collection('games')
        .doc(gameId)
        .collection('playerStates')
        .add(playerState);
        
    /*
    return gameDocRef.get()
        .then((docSnapshot) => gameDocRef.collection('playerStates').doc(playerState.username).set(playerState));
    */
}

export function updatePlayerState(gameId: GameID, playerStateUpdate: Partial<PlayerState>) {
    const playerStateDocRef = firebase.firestore().collection('games').doc(gameId).collection('playerStates').doc(playerStateUpdate.username); 

    return playerStateDocRef.update(playerStateUpdate)
        .then(()=> true)
        .catch((error: Error) => {
            throw error;
        });
}
