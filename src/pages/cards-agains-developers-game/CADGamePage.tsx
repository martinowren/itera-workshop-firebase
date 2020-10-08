import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Game, GameID, CardID, Card, Player } from '../../types';
import { useAuth } from '../../auth/AuthContext';
import { useRealtimeRounds } from '../../game/useRealtimeRounds';
import { addRound, updateRound, updateGame } from '../../game/game.service';

import {
    Hand,
    Button,
    BlackCard,
    drawBlackCard,
    drawWhiteCard,
    PlayerCard,
    Modal,
} from '../../components';
import {
    getScore,
    userOwnsGame,
    gameHasNotStarted,
    userIsCardTsar,
    allHaveSubmittedAWhiteCard,
    getNextCardTzar,
    getWinnerOfTheGameIfAny,
    haveSubmittedACardThisRound,
} from './helpers';
import { Link } from 'react-router-dom';

const NUMBER_OF_CARDS_TO_HOLD = 10;
const WINNING_SCORE = 5;

export interface GameProps {
    games: Game[];
}

export const CADGame: FC<GameProps> = ({games}) => {
    const authContext = useAuth();
    const params = useParams<{gameId: GameID}>();
    const game = games.find(g => g.id === params.gameId) as Game;
    const [modalOpen, setModalOpen] = useState(true);
    const [rounds, currentRound] = useRealtimeRounds(params.gameId);
    const [currentRoundId, setCurrentRoundId] = useState<string>();
    
    const [cardsOnHand, setCardsOnHand] = useState<Card[]>([]);

    const score = getScore(rounds);

    /**
     * Start the game by adding the first round to the rounds collection on the game document.
     */
    const startGame = () => {
        if (params.gameId && authContext.user && authContext.user.uid) {
            const blackCard = drawBlackCard(rounds);
            addRound(params.gameId, {
                blackCard: blackCard.id,
                cardTsar: {uid: authContext.user.uid, displayName: authContext.user.displayName},
                turns: [],
                showCards: false,
                winner: null,
            });
        }
    }

    // This is ugly
    useEffect(() => {
        if (currentRound && currentRound.id) {
            setCurrentRoundId(currentRound.id);
        }
    }, [currentRound])

    /**
     * The current round has changed, i.e. a new round has started.
     * The player draw white cards until he/she has 10.
     */
    useEffect(() => {
        if (currentRoundId) {
            setCardsOnHand(currentHand => {
                const newHand = currentHand ? [...currentHand] : [];
                while(newHand.length < NUMBER_OF_CARDS_TO_HOLD) {
                    newHand.push(drawWhiteCard(newHand.map(c => c.id)));
                }
                return newHand;
            });
        }
    }, [currentRoundId]);

    const playCard = (cardId: CardID) => {
        if (params.gameId && currentRound && authContext.user) {
            updateRound(params.gameId, currentRound.id, {
                turns: [...currentRound.turns, { username: authContext.user as Player, card: cardId}]
            }).then(() => {
                setCardsOnHand(currentHand => currentHand.filter(c => c.id !== cardId));
            })
        } else {
            console.log("cannot play card")
        }
    }

    const revealCards = () => {
        if (params.gameId && currentRound && authContext.user) {
            updateRound(params.gameId, currentRound.id,{
                showCards: true,
            })
        }
    }

    const declareWinner = async (player: Player) => {
        if (params.gameId && currentRound && authContext.user) {
            try {
                await updateRound(params.gameId, currentRound.id, {
                    winner: player,
                });
                const newScore = getScore(rounds, { [player.uid]: 1 });
                const winnerOfTheGame = getWinnerOfTheGameIfAny(newScore, WINNING_SCORE);
                if (winnerOfTheGame) {
                    await updateGame(params.gameId, {
                        winner: player,
                    });
                } else {
                    const blackCard = drawBlackCard(rounds);
                    await addRound(params.gameId, {
                        blackCard: blackCard.id,
                        turns: [],
                        showCards: false,
                        winner: null,
                        cardTsar: getNextCardTzar(game.players, currentRound.cardTsar)
                    });
                }
            } catch(e) {
                console.error(e);
            }
        }
    }
    
    if (!game) return null; // move up?

    const showCards = currentRound && currentRound.showCards;;
    const showStartGameButton = userOwnsGame(authContext, game) && gameHasNotStarted(rounds);
    const showRevealCardsButton = 
        currentRound &&
        userIsCardTsar(currentRound, authContext) && 
        allHaveSubmittedAWhiteCard(currentRound.cardTsar, game.players, currentRound ? currentRound.turns: []) &&
        !showCards; 
    
    const playerIsCardTsar = currentRound && userIsCardTsar(currentRound, authContext);
    const haveSubmittedCard = currentRound && haveSubmittedACardThisRound(currentRound, authContext);

    return (
        <>
            <div className='table'>
                <div className='table__black-card'>
                    { currentRound && (
                        <BlackCard cardId={currentRound.blackCard} />
                    )}
                </div>
                <div className='table__controlls'>
                    <div>
                        { currentRound ? `Card tzar: ${currentRound.cardTsar.displayName}` : '' }
                    </div>
                    { showStartGameButton && (
                        <Button onClick={() => startGame()}>Start game</Button>
                    )}
                    { showRevealCardsButton && (
                        <Button onClick={() => revealCards()}>Reveal cards</Button>
                    )}
                </div>

                <div className='table__players'>
                    <div className='table__players__container'>
                        { currentRound && game.players.map(player => (
                            <PlayerCard 
                                key={player.uid}
                                score={score}
                                currentRound={currentRound}
                                playerIsCardTsar={playerIsCardTsar}
                                declareWinner={declareWinner}
                                player={player}
                            />
                        ))}
                    </div>
                </div>

                <div className='table__hand'>
                    <Hand 
                        cards={cardsOnHand}
                        playCard={playCard}
                        hidePlayCardButton={playerIsCardTsar || haveSubmittedCard}
                    />
                </div>
            </div>
            { game.winner && modalOpen &&
                <Modal
                    setModalOpen={setModalOpen}
                >
                    <p>{game.winner.displayName} won the game!</p>
                    <Link to='/'>Exit game</Link>
                </Modal>
            }
        </>
    )
}
