import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useRealtimeGames } from './game/useRealtimeGames';
import useFirebaseAuth from './auth/useFirebaseAuth';
import { AuthContext } from './auth/AuthContext';
import { HomePage, CADGame, LoginPage } from './pages';

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
            <Route path="/" exact>
              <HomePage games={games} />
            </Route>
            <Route path="/game/:gameId" exact>
              <CADGame games={games} />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
