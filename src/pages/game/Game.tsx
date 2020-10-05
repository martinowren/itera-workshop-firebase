import React, { FC } from 'react';
import { useParams } from 'react-router';

import { Game as GameType, GameID, Round, CardID } from '../../types';
import { useAuth, AuthContextType } from '../../auth/AuthContext';
import { useRealtimePlayerStates } from '../home/useRealtimePlayerStates';
import { useRealtimeRounds } from '../../game/useRealtimeRounds';
import Hand from './Hand';
import Table from './Table';
import { Button } from '../../components/button/Button';
import { addRound } from './game.service';
import blackCards from '../../cards/black-cards';

export interface GameProps {
    games: GameType[];
}

export const Game: FC<GameProps> = ({games}) => {
    const params = useParams<{gameId: GameID}>();
    const game = games.find(g => g.id === params.gameId) as GameType;
    
    const authContext = useAuth();
    
    const gameId = game ? game.id : undefined;

    const [rounds, currentRound] = useRealtimeRounds(gameId);
    const [playerStates, yourPlayerState] = useRealtimePlayerStates(gameId, authContext);


    console.log(playerStates, rounds)

    const startGame = () => {
        if (gameId) {
            const blackCard = drawBlackCard(rounds);
            addRound(gameId, {
                blackCard: blackCard.id,
            });

            // dealCards(gameId);
        }
    }

    const showStartGameButton = userOwnsGame(authContext, game, rounds);
    const gameHasStarted = !!currentRound;
    return (
        <div className='game'>
            { gameHasStarted && (
                <Table game={game} playerStates={playerStates} currentRound={currentRound as Round} />
            )}

            { yourPlayerState && currentRound && (
                <Hand 
                    playerState={yourPlayerState} 
                    roundId={currentRound.id as string} 
                    gameId={game.id as GameID}
                />
            )}

            { showStartGameButton && (
                <Button onClick={() => startGame()}>Start Game</Button>
            )}
        </div>
    )
}

function userOwnsGame(authContext: AuthContextType, game: GameType, rounds: Round[]): boolean {
    if (authContext.user && authContext.user.email && game) {
        return game.owner === authContext.user.email && rounds.length === 0;
    }
    return false;
}

function drawBlackCard(rounds: Round[]) {
    const usedCards = rounds.map(r => r.blackCard);
    const cardsInDeck = blackCards.filter(c => !usedCards.includes(c.id));
    const randomIndex = Math.floor(Math.random() * Math.max(cardsInDeck.length - 1, 0));
    return cardsInDeck[randomIndex];
}