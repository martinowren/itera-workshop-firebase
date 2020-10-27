import React, { FC } from 'react';
import blackCards from '../../cards/black-cards';
import { CardID, Round } from '../../types';

export const BlackCard: FC<{ cardId: CardID }> = ({ cardId }) => {
	const card = blackCards.find((c) => c.id === cardId);
	if (card) {
		return <div className="black-card">{card.content}</div>;
	}
	return null;
};

export function drawBlackCard(rounds: Round[]) {
	const usedCards = rounds.map((r) => r.blackCard);
	const cardsInDeck = blackCards.filter((c) => !usedCards.includes(c.id));
	const randomIndex = Math.floor(
		Math.random() * Math.max(cardsInDeck.length - 1, 0)
	);
	return cardsInDeck[randomIndex];
}
