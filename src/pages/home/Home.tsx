import React, {FC} from 'react';
import CreateGame from './CreateGame'; 
import GameList from './GameList';
import { Game } from '../../types';

export interface HomeProps {
    games: Game[];
}

export const Home: FC<HomeProps> = ({games}) => {
    return (
        <div className='home'>
            
            <CreateGame />

            <GameList games={games} />

        </div>
    )
}
