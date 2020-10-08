import React, {FC} from 'react';
import whiteCards from '../../cards/white-cards';
import { CardID } from '../../types';

interface WhiteCardProps {
    cardId: CardID; 
    button: React.ReactNode;
    showCard: boolean;
}

export const WhiteCard: FC<WhiteCardProps> = ({cardId, button, showCard}) => {
    const card = whiteCards.find(c => c.id === cardId);
    if (card) {
        if (showCard) {
            return <div className='white-card'>
                <div className='white-card__content'>
                    {card.content}
                </div>

                { button }
            </div>
        } else {
            return <div className='white-card white-card--upside-down'></div>
        }
    }
    return null;
}


export function drawWhiteCard(cardsOnHand: CardID[]) {
    const cardsInDeck = whiteCards.filter(c => !cardsOnHand.includes(c.id));
    const randomIndex = Math.floor(Math.random() * Math.max(cardsInDeck.length - 1, 0));
    return cardsInDeck[randomIndex];
}