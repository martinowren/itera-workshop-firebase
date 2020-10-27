import React, { Dispatch, FC, SetStateAction } from 'react';

import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

import { Game, GameID } from '../../types';
import { useAuth } from '../../auth/AuthContext';
import { deleteGame } from '../../game/game.service';

export interface GameListEntryProps {
	game: Game;
	setEditGameId: Dispatch<SetStateAction<string | undefined>>;
	joinGame: (gameId: string) => Promise<void>;
}

const GameListEntry: FC<GameListEntryProps> = ({
	game,
	setEditGameId,
	joinGame,
}) => {
	const authContext = useAuth();

	const hasWinner = game.winner?.displayName !== undefined;
	const isOwner = authContext.user?.uid === game.owner.uid;

	const removeGame = async (gameId: GameID) => {
		try {
			console.log(gameId);
			await deleteGame(gameId);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Grid item xs={3}>
			<Card style={{ height: '100%' }}>
				<Box p={1} justifyContent="center">
					<CardHeader
						title={game.name}
						subheader={`Owner: ${game.owner.displayName}`}
						action={
							isOwner && (
								<>
									<IconButton
										aria-label="edit"
										onClick={() => setEditGameId(game.id)}
									>
										<Edit fontSize="small" />
									</IconButton>
									<IconButton
										aria-label="delete"
										onClick={() => removeGame(game.id)}
									>
										<Delete fontSize="small" />
									</IconButton>
								</>
							)
						}
					/>
					<CardContent>
						<Typography variant="body2" component="p">
							{game.players?.length ?? 0} joined players
						</Typography>
					</CardContent>
					<CardActions>
						<strong>
							{hasWinner ? (
								game.winner?.displayName + ' is the winner!'
							) : (
								<Button onClick={() => joinGame(game.id)}>
									Join
								</Button>
							)}
						</strong>
					</CardActions>
				</Box>
			</Card>
		</Grid>
	);
};

export default GameListEntry;
