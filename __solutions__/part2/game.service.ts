import firebase from 'firebase';
import { Game, GameID, Round } from '../../src/types';

/**
 * CRUD for game documents
 */
export function addGame(game: Omit<Game, 'id' | 'rounds'>) {
  return firebase.firestore().collection('games').add(game);
}

export function getGame(id: GameID) {
  const gameDocRef = firebase.firestore().collection('games').doc(id);

  return gameDocRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      return docSnapshot.data() as Game;
    } else {
      return null;
    }
  });
}

export function updateGame(id: GameID, gameData: Partial<Game>) {
  // if (!id) return Promise.reject('cannot get document without an id');
  return firebase.firestore().collection('games').doc(id).update(gameData);
}

export function deleteGame(id: GameID) {
  // if (!id) return Promise.reject('cannot delete document without an id');
  return firebase.firestore().collection('games').doc(id).delete();
}

// 🔥 Implement transaction for updating the game such that consistency is maintained
export function updateGameTransaction(id: GameID, gameData: Partial<Game>) {}

/**
 * CRUD for round documents
 */
export function addRound(gameId: GameID, round: Omit<Round, 'id'>) {
  return firebase
    .firestore()
    .collection('games')
    .doc(gameId)
    .collection('rounds')
    .add({
      ...round,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export function updateRound(
  gameId: GameID,
  roundId: string,
  roundData: Partial<Round>
) {
  return firebase
    .firestore()
    .collection('games')
    .doc(gameId)
    .collection('rounds')
    .doc(roundId)
    .update(roundData);
}

// 🔥 Implement transaction for updating rounds
