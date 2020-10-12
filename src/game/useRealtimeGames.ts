/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { Game } from '../types';

export function useRealtimeGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // Add your code here for part 1 task 6
  }, []);

  return games;
}
