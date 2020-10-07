import React, { FC } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Button } from '../../components';

export const LoginPage = () => {
    const authContext = useAuth();
    return (
        <div>
            Login page
            <Button onClick={() => {
                if(authContext && authContext.login) {
                    authContext.login()
                }
            }}>Login</Button>
        </div>
    )
}
