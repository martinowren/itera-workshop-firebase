import { AuthContextType } from '../../auth/AuthContext';
import { Game, Round, Username, Turn } from '../../types';

export function userOwnsGame(authContext: AuthContextType, game: Game) {
    if (authContext.user && game) {
        return game.owner === authContext.user.email
    }
    return false;
}

export function gameHasNotStarted(rounds: Round[]) {
    return  rounds.length === 0;;
}

export function userIsCardTsar(currentRound: Round, authContext: AuthContextType) {
    if (authContext.user) {
        return currentRound.cardTsar === authContext.user.email;
    }
    return false;
}

export function allHaveSubmittedAWhiteCard(cardTsar: Username, players: Username[], turns: Turn[]) {
    const playersWhoNeedToSubmitACard = players.filter(username => username !== cardTsar);
    return playersWhoNeedToSubmitACard.find((username: Username) => !turns.map(t => t.username).includes(username)) === undefined;
}


export function getScore(rounds: Round[], initialState: Record<Username, number> = {}): Record<Username, number> {
    return rounds.reduce((score, round) => {
        if (round.winner) {
            if (typeof score[round.winner] === 'number') {
                score[round.winner] += 1;
            } else {
                score[round.winner] = 1;
            }
        }
        return score;
    }, initialState);
}

export function getNextCardTzar(players: Username[], currentCardTzar: Username) {
    const sortedPlayers = players.sort((a, b) => a.localeCompare(b));
    const indexOfCurrentTzar = sortedPlayers.indexOf(currentCardTzar);
    return sortedPlayers[(indexOfCurrentTzar + 1) % sortedPlayers.length]
}

export function getWinnerOfTheGameIfAny(score: Record<Username, number>, pointsToWin: number) {
    const scoreArray = Object.entries(score)
    for (let [username, points] of scoreArray) {
        if (points >= pointsToWin) {
            return username;
       }
    }
    return undefined;
}

export function haveSubmittedACardThisRound(currentRound: Round, authContext: AuthContextType) {
    if (authContext.user && authContext.user.email) {
        return currentRound.turns.map(t => t.username).includes(authContext.user.email); 
    }
    return false;
}