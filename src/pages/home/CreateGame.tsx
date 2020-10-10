import React, { FC, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { addGame } from '../../game/game.service';
import { useAuth } from '../../auth/AuthContext';

const CreateGame: FC = () => {
  const authContext = useAuth();
  const [gameName, setGameName] = useState('');

  const createGame = () => {
    try {
      if (authContext.user && authContext.user.uid) {
        addGame({
          name: gameName,
          owner: {
            uid: authContext.user.uid,
            displayName: authContext.user.displayName,
          },
          players: [],
        });
      } else {
        throw new Error('uid for user is not available!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box display="flex" flexDirection="row" mb={2}>
      <Box flexGrow={1} mr={1}>
        <TextField
          value={gameName}
          fullWidth
          variant="outlined"
          onChange={(e) => setGameName(e.target.value)}
          label="Choose a name for your game"
        />
      </Box>
      <Button variant="contained" color="primary" onClick={() => createGame()}>
        New Game
      </Button>
    </Box>
  );
};

export default CreateGame;
