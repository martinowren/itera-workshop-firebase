import React, { FC, useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
	TextField,
} from '@material-ui/core';

import { getGame, updateGame } from '../../game/game.service';
import { Game, GameID } from '../../types';
import { useAuth } from '../../auth/AuthContext';
import { useHistory } from 'react-router';
import GameListEntry from './GameListEntry';

export interface GameListProps {
	games: Game[];
}

const GameList: FC<GameListProps> = ({ games }) => {
	const authContext = useAuth();
	const history = useHistory();
	const [editGameId, setEditGameId] = useState<string>();
	const [newGameName, setNewGameName] = useState<string>();

	const handleCloseDialog = () => {
		setEditGameId(undefined);
		setNewGameName(undefined);
	};

	const joinGame = async (gameId: GameID) => {
		const game = games.find((g) => g.id === gameId) as Game;
		try {
			if (authContext.user && authContext.user.uid) {
				let uniquePlayers = game.players;
				if (
					!game.players.some(
						(elem) => elem.uid === authContext.user?.uid
					)
				) {
					uniquePlayers.push({
						uid: authContext.user.uid,
						displayName: authContext.user.displayName,
					});
				}
				const gameRes = await getGame(gameId);
				console.log('getGame response:', gameRes);
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

	const updateGameName = async () => {
		try {
			if (editGameId) {
				await updateGame(editGameId, { name: newGameName });
				handleCloseDialog();
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<Grid container spacing={3}>
				{games.map((game) => (
					<GameListEntry
						key={game.id}
						game={game}
						setEditGameId={setEditGameId}
						joinGame={joinGame}
					/>
				))}
			</Grid>
			<Dialog
				open={editGameId !== undefined}
				onClose={handleCloseDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogContent>
					<DialogContentText>
						Change the name of your game.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						fullWidth
						onChange={(e) => setNewGameName(e.currentTarget.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={updateGameName} color="primary">
						Change
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default GameList;
