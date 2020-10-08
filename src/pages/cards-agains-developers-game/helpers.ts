import { AuthContextType } from '../../auth/AuthContext';
import { Game, Round, Player, Turn } from '../../types';

export function userOwnsGame(authContext: AuthContextType, game: Game) {
  if (authContext.user && game) {
    return game.owner.uid === authContext.user.uid;
  }
  return false;
}

export function gameHasNotStarted(rounds: Round[]) {
  return rounds.length === 0;
}

export function userIsCardTsar(
  currentRound: Round,
  authContext: AuthContextType
) {
  if (authContext.user) {
    return currentRound.cardTsar.uid === authContext.user.uid;
  }
  return false;
}

export function allHaveSubmittedAWhiteCard(
  cardTsar: Player,
  players: Player[],
  turns: Turn[]
) {
  const playersWhoNeedToSubmitACard = players.filter(
    (username) => username !== cardTsar
  );
  return (
    playersWhoNeedToSubmitACard.find(
      (submitter: Player) => !turns.map((t) => t.player).includes(submitter)
    ) === undefined
  );
}

export function getScore(
  rounds: Round[],
  initialState: Record<string, number> = {}
): Record<string, number> {
  return rounds.reduce((score, round) => {
    if (round.winner) {
      if (typeof score[round.winner.uid] === 'number') {
        score[round.winner.uid] += 1;
      } else {
        score[round.winner.uid] = 1;
      }
    }
    return score;
  }, initialState);
}

export function getNextCardTzar(players: Player[], currentCardTzar: Player) {
  const sortedPlayers = players.sort((a, b) => a.uid.localeCompare(b.uid));
  const indexOfCurrentTzar = sortedPlayers.indexOf(currentCardTzar);
  return sortedPlayers[(indexOfCurrentTzar + 1) % sortedPlayers.length];
}

export function getWinnerOfTheGameIfAny(
  score: Record<string, number>,
  pointsToWin: number
) {
  const scoreArray = Object.entries(score);
  for (let [username, points] of scoreArray) {
    if (points >= pointsToWin) {
      return username;
    }
  }
  return undefined;
}

export function haveSubmittedACardThisRound(
  currentRound: Round,
  authContext: AuthContextType
) {
  if (authContext.user && authContext.user.uid) {
    return currentRound.turns
      .map((t) => t.player.uid)
      .includes(authContext.user.uid);
  }
  return false;
}
