import React, { FC } from 'react';
import { Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useRealtimeGames } from './game/useRealtimeGames';
import useFirebaseAuth from './auth/useFirebaseAuth';
import { AuthContext } from './auth/AuthContext';
import { HomePage, CADGame, LoginPage } from './pages';
import PrivateRoute from './components/routeTypes/PrivateRoute';
import PublicRoute from './components/routeTypes/PublicRoute';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
  },
});

const App: FC = () => {
  const authContext = useFirebaseAuth();
  const games = useRealtimeGames();

  return (
    <AuthContext.Provider value={authContext}>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Switch>
            <PrivateRoute
              path="/game/:gameId"
              authenticated={authContext.isLoggedIn}
              games={games}
              component={CADGame}
            />
            <PrivateRoute
              exact
              path="/"
              authenticated={authContext.isLoggedIn}
              games={games}
              component={HomePage}
            />
            <PublicRoute
              path="/login"
              authenticated={authContext.isLoggedIn}
              component={LoginPage}
            />
          </Switch>
        </div>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
