import React, { FC } from 'react';
import { Player, Round } from '../../types';
import { WhiteCard } from '../white-card/WhiteCard';
import { Button } from '../button/Button';

interface PlayerCardProps {
    score: Record<string, number>;
    currentRound: Round;
    playerIsCardTsar?: boolean;
    declareWinner: (player: Player) => void;
    player: Player;
}

export const PlayerCard: FC<PlayerCardProps> = ({score, currentRound, playerIsCardTsar, declareWinner, player}) => {
    const playerTurn = currentRound.turns.find(t => t.player.uid === player.uid);
    const playerScore = score[player.uid] || 0;
    return (
       <div className='player'>
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
               {player.displayName}
           </div>
            <div className='player__score'>{playerScore} points</div>
       </div>
    );
}
