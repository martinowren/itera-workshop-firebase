// eslint-disable-next-line @typescript-eslint/no-unused-vars
import firebase from 'firebase';
import { Game, GameID, Round } from '../types';

/**
 * CRUD for game documents
 */
export function addGame(game: Omit<Game, 'id' | 'rounds'>) {
  // Add your code here for part 2 task 1
  return null;
}

export function getGame(id: GameID) {
  // Add your code here for part 2 task 1
  return null;
}

export function updateGame(id: GameID, gameData: Partial<Game>) {
  // Add your code here for part 2 task 1
  return null;
}

export function deleteGame(id: GameID) {
  // Add your code here for part 2 task 1
  return null;
}

// 🔥 Implement transaction for updating the game such that consistency is maintained
export function updateGameTransaction(id: GameID, gameData: Partial<Game>) {}

/**
 * CRUD for round documents
 */
export function addRound(gameId: GameID, round: Omit<Round, 'id' | 'timestamp'>) {
  // Add your code here for part 2 task 2
  return null;
}

export function updateRound(
  gameId: GameID,
  roundId: string,
  roundData: Partial<Round>
) {
  // Replace the current return and add your code here for part 2 task 1
  return new Promise((success) => {
    success([]);
  });
}

// 🔥 Implement transaction for updating rounds
