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
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';

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
        <AppBar position="static">
          <Toolbar>
            <Typography style={{ flexGrow: 1 }} variant="h6">
              {authContext.isLoggedIn
                ? authContext.user?.displayName
                : 'Welcome!'}
            </Typography>
            {authContext.isLoggedIn && (
              <Button color="inherit" onClick={authContext.logout}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
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
