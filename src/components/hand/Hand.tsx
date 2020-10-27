import React, { FC } from 'react';

import { Button } from '../../components/button/Button';
import { CardID, Card } from '../../types';
import { WhiteCard } from '../white-card/WhiteCard';

export interface HandProps {
	cards: Card[];
	playCard: (cardId: CardID) => void;
	hidePlayCardButton?: boolean;
}

export const Hand: FC<HandProps> = ({
	cards,
	playCard,
	hidePlayCardButton,
}) => {
	return (
		<ul className="hand">
			{cards.map((card) => {
				return (
					<WhiteCard
						key={card.id}
						cardId={card.id}
						showCard={true}
						button={
							hidePlayCardButton ? null : (
								<Button
									onClick={() => {
										console.log('button clicked');
										playCard(card.id);
									}}
								>
									Play card
								</Button>
							)
						}
					/>
				);
			})}
		</ul>
	);
};
