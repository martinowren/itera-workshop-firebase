import React, {FC} from 'react';
import CreateGame from './CreateGame'; 
import GameList from './GameList';
import { Game } from '../../types';

export interface HomePageProps {
    games: Game[];
}

export const HomePage: FC<HomePageProps> = ({games}) => {
    return (
        <div className='home'>
            
            <CreateGame />

            <GameList games={games} />

        </div>
    )
}
