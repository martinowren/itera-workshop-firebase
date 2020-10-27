import React, { FC } from 'react';
import CreateGame from './CreateGame';
import GameList from './GameList';
import { Game } from '../../types';

export interface HomePageProps {
	games: Game[];
}

export const HomePage: FC<HomePageProps> = ({ games }) => {
	return (
		<div className="home">
			<h1>Cards Against Developers!</h1>
			<CreateGame />

			{games?.length > 0 ? (
				<GameList games={games} />
			) : (
				<p> There are no active games. Try creating a new one!</p>
			)}
		</div>
	);
};
