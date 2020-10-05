import React, { FC } from 'react';

import { Button } from '../../components/button/Button'; 
import whiteCards from '../../cards/white-cards';
import { CardID, GameID, PlayerState } from '../../types';
import { updatePlayerState } from './game.service';

export interface HandProps {
    gameId: GameID;
    playerState: PlayerState;
    // cards: CardID[];
    roundId: string;
}

const Hand: FC<HandProps> = ({gameId, playerState, roundId}) => {

    const playCard = (cardId: CardID) => {
        updatePlayerState(gameId, {
            ...playerState,
            turns: [...playerState.turns, { roundId: roundId, card: cardId }],
            cardsOnHand: playerState.cardsOnHand.filter(c => c !== cardId),
        });
    }

    return (
        <ul>
            { playerState.cardsOnHand.map(cardId => {
                const card = whiteCards.find(c => c.id === cardId);
                return (<li className='card card--white'>
                        <div>card.content</div>
                        <Button onClick={() => playCard(cardId)}>Play card</Button>
                    </li>
                );
            })}
        </ul>
    )
}

export default Hand;