import { useState } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Container,
    Grid,
} from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

import './LoginForm.css'; // Import a CSS file for custom styles

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(''); // State for error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic client-side validation
        if (formData.username === 'exampleuser' && formData.password === 'password123') {
            // Successful login
            setError('');
            console.log('Login successful');
        } else {
            // Wrong login
            setError('Invalid username or password');
        }
    };

    return (
        <Container
            maxWidth="xs"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh', // Set the minimum height to 60% of the viewport height
            }}
        >
            <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                {error && (
                    <div className="error">
                        <ErrorOutlineRoundedIcon className="error-icon" /> {/* Use the ErrorOutlineRoundedIcon icon */}
                        <Typography variant="body1" color="error" className="error-text">
                            {error}
                        </Typography>
                    </div>
                )}
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                variant="outlined"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default LoginForm;
