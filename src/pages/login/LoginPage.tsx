import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { useAuth } from '../../auth/AuthContext';

export const LoginPage = () => {
	const authContext = useAuth();
	const [username, setUserName] = useState<string>('');
	const [validationError, setValidationError] = useState<boolean>(false);

	const handleSubmit = () => {
		if (!username) {
			setValidationError(true);
		} else if (authContext && authContext.login) {
			authContext.login(username);
		}
	};

	return (
		<Container maxWidth="sm">
			<p>Create a user or sign in to start playing!</p>
			<Box display="flex" flexDirection="row">
				<Box flexGrow={1} mr={1}>
					<TextField
						label="Choose your username"
						value={username}
						fullWidth
						variant="outlined"
						onChange={(e) => {
							setValidationError(false);
							setUserName(e.target.value);
						}}
						error={validationError}
						helperText={
							validationError ? 'Field cannot be empty' : ''
						}
					/>
				</Box>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
				>
					Login
				</Button>
			</Box>
		</Container>
	);
};
