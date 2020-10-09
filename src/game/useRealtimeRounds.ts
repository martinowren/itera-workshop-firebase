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
      // Add your code here for part 2 task 5
    }
  }, [gameId]);

  const currentRound = gameRounds.length ? gameRounds[0] : undefined;

  return [gameRounds, currentRound];
}
