import React, { FC } from 'react';
import { Game, PlayerState, Round, CardID, Card } from '../../types';
import blackCards from '../../cards/black-cards';
import whiteCards from '../../cards/white-cards';

export interface TableProps {
    game: Game;
    playerStates: PlayerState[];
    currentRound: Round;
}

const Table: FC<TableProps> = ({ game, playerStates, currentRound }) => {


    return (
        <div className='table'>
            <div className=''>
                <BlackCard cardId={currentRound.blackCard} />
            </div>
            <div className='table__players'>
                { playerStates.map(state => {
                    const turn = state.turns.find(t => t.roundId === currentRound.id);
                    if (turn) {
                        return (
                            <div className='player__turn'>
                                <WhiteCard cardId={turn.card} />
                            </div>
                        )
                    } else {
                        return <div>User has not selected a card yet</div>
                    }
                })}
            </div>
        </div>
    )
}

export default Table;


const BlackCard: FC<{cardId: CardID}> = ({cardId}) => {
    const card = blackCards.find(c => c.id === cardId);
    if (card) {
        return <div className='card card--black'>
            {card.content}
        </div>
    }
    return null;
}


const WhiteCard: FC<{cardId: CardID}> = ({cardId}) => {
    const card = whiteCards.find(c => c.id === cardId);
    if (card) {
        return <div className='card card--white'>
            {card.content}
        </div>
    }
    return null;
}