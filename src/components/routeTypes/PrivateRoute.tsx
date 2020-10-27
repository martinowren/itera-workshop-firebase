import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { Game } from '../../types';

export interface PrivateRouteProps extends RouteProps {
	authenticated: boolean;
	games: Game[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	component: Component,
	authenticated,
	games,
	...rest
}) => {
	if (!Component) return null;
	return (
		<Route
			{...rest}
			render={(props: any) =>
				authenticated ? (
					<Component games={games} {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
