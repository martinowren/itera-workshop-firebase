import React, { FC } from 'react';
import { addPlayerState } from '../game/game.service';
import { Game, GameID } from '../../types';
import { useAuth } from '../../auth/AuthContext';
import { useHistory } from 'react-router';

export interface GameListProps {
    games: Game[];
}

const GameList: FC<GameListProps> = ({games}) => {

    return (
        <ul className='game-list'>
            { games.map(game => {
                return <GameItem gameId={game.id as GameID} name={game.name}  />
            })}
        </ul>
    )
}

const GameItem: FC<{gameId: GameID, name: string}> = ({gameId, name}) => {
    const authContext = useAuth();
    const history = useHistory();

    const joinGame = async (gameId: GameID) => {
        try {
            if (authContext.user && authContext.user.displayName) {
                await addPlayerState(gameId, {
                    username: authContext.user.displayName,
                    cardsOnHand: [],
                    points: 0,
                    turns: [],
                });
                history.push(`/game/${gameId}`);
            } else {
                throw new Error("displayName for user is not available!")
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <li className='game-list__item'>
            <h4>{name}</h4>
            <button onClick={() => joinGame(gameId)}>Join Game</button>
        </li>
    )
}

export default GameList;