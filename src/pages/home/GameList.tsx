import React, { FC } from 'react';
import { updateGame } from '../../game/game.service';
import { Game, GameID } from '../../types';
import { useAuth } from '../../auth/AuthContext';
import { useHistory } from 'react-router';
import { getScore } from '../cards-agains-developers-game/helpers';

export interface GameListProps {
    games: Game[];
}

const GameList: FC<GameListProps> = ({games}) => {
    const authContext = useAuth();
    const history = useHistory();

    const joinGame = async (gameId: GameID) => {
        const game = games.find(g => g.id === gameId) as Game;
        try {
            if (authContext.user && authContext.user.email) {
                await updateGame(gameId, {
                    players: Array.from(new Set([...game.players, authContext.user.email]))
                });
                history.push(`/game/${gameId}`);
            } else {
                throw new Error("email for user is not available!")
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ul className='game-list'>
            { games.map(game => {
                return (
                    <li className='game-list__item' key={game.id}>
                        <h4>{game.name}</h4>
                        <div>Owner: {game.owner}</div>
                        <div>Joined players: {game.players.length}</div>
                        <div>Winner: {game.winner}</div>
                        <button onClick={() => joinGame(game.id)}>Join Game</button>
                    </li>
                )
            })}
        </ul>
    )
}

export default GameList;