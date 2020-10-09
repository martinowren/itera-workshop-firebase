import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { updateGame } from '../../game/game.service';
import { Game, GameID } from '../../types';
import { useAuth } from '../../auth/AuthContext';
import { useHistory } from 'react-router';

export interface GameListProps {
  games: Game[];
}

const GameList: FC<GameListProps> = ({ games }) => {
  const authContext = useAuth();
  const history = useHistory();

  const joinGame = async (gameId: GameID) => {
    const game = games.find((g) => g.id === gameId) as Game;
    try {
      if (authContext.user && authContext.user.uid) {
        let uniquePlayers = game.players;
        if (!game.players.some((elem) => elem.uid === authContext.user?.uid)) {
          uniquePlayers.push({
            uid: authContext.user.uid,
            displayName: authContext.user.displayName,
          });
        }
        await updateGame(gameId, {
          players: uniquePlayers,
        });
        history.push(`/game/${gameId}`);
      } else {
        throw new Error('uid for user is not available!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid container spacing={3}>
      {games.map((game) => {
        const hasStarted =
          game.rounds !== undefined && game.rounds.length !== 0;
        const hasWinner = game.winner?.displayName !== undefined;
        return (
          <Grid item key={game.id} xs={3}>
            <Card>
              <Box p={1} justifyContent="center">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Owner: {game.owner.displayName}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {game.name}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {game.players?.length ?? 0} joined players
                  </Typography>
                  <Box pt={2}>
                    <strong>
                      {hasWinner
                        ? game.winner?.displayName + 'is the winner!'
                        : hasStarted
                        ? 'Game in progress'
                        : ''}
                    </strong>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button onClick={() => joinGame(game.id)}>Join</Button>
                </CardActions>
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default GameList;
