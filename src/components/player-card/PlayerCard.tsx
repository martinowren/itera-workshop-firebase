import React, { FC } from 'react';
import { Username, Turn, Round } from '../../types';
import { WhiteCard } from '../white-card/WhiteCard';
import { Button } from '../button/Button';

interface PlayerCardProps {
    score: Record<Username, number>;
    currentRound: Round;
    playerIsCardTsar?: boolean;
    declareWinner: (player: Username) => void;
    player: Username;
}

export const PlayerCard: FC<PlayerCardProps> = ({score, currentRound, playerIsCardTsar, declareWinner, player}) => {
    const playerTurn = currentRound.turns.find(t => t.username === player);

    return (
       <div className='player'>
           <div className='player__score'>{score[player]}</div>
           <div className='player__card-frame'>
               { playerTurn && (
                   <WhiteCard
                       cardId={playerTurn.card} 
                       showCard={currentRound.showCards}
                       button={playerIsCardTsar ? <Button onClick={() => declareWinner(player)}>Select winner</Button> : null}
                   />
               )}
           </div>
           <div className='player__username'>
               {player}
           </div>
       </div>
    );
}
