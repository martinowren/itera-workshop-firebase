import React, { FC, useState } from 'react';
import { addGame } from '../../game/game.service';

import { TextInput } from '../../components/text-input/TextInput';
import { useAuth } from '../../auth/AuthContext';

const CreateGame: FC = () => {
    const authContext = useAuth();
    const [gameName, setGameName] = useState("");

    const createGame = () => {
        try {
            if (authContext.user && authContext.user.email) {
                addGame({
                    name: gameName,
                    owner: authContext.user.email,
                    players: [],
                });
            } else {
                throw new Error("email for user is not available!");
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <TextInput value={gameName} onChange={(e) => setGameName(e.target.value)} label="Game name" />
            <button onClick={() => createGame()}> 
                New Game
            </button>
        </div>
    )
}

export default CreateGame;
