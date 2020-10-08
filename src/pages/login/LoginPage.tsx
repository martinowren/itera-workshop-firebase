import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Button, TextInput } from '../../components';

export const LoginPage = () => {
    const authContext = useAuth();
    const [username, setUserName] = useState("");

    return (
        <div>
            Sign In to the game!
            <TextInput label="Choose your username" value={username} onChange={(e) => setUserName(e.target.value)}> </TextInput>
            <Button onClick={() => {
                if(authContext && authContext.login) {
                    authContext.login(username)
                }
            }}>Login</Button>
        </div>
    )
}
