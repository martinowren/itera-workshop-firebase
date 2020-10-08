import React, { FC, useState } from 'react';
import { addGame } from '../../game/game.service';

import { TextInput } from '../../components/text-input/TextInput';
import { useAuth } from '../../auth/AuthContext';

const CreateGame: FC = () => {
    const authContext = useAuth();
    const [gameName, setGameName] = useState("");

    const createGame = () => {
        try {
            if (authContext.user && authContext.user.uid) {
                addGame({
                    name: gameName,
                    owner: {uid: authContext.user.uid, displayName: authContext.user.displayName},
                    players: [],
                });
            } else {
                throw new Error("uid for user is not available!");
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
