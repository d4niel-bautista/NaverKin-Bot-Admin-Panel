import { useState } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Container,
    Grid,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import './LoginForm.css'; // Import a CSS file for custom styles

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [message, setMessage] = useState(''); // State for message message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/login", {method: "POST", body: JSON.stringify(formData)});
        console.log(await response.json());
        if (response.ok) {
            // Successful login
            setMessage((
                <div className="success">
                    <CheckCircleIcon className="success-icon" />
                    <Typography variant="body1" color="success" className="success-text">
                        Logging in...
                    </Typography>
                </div>
            ));
        } else {
            // Wrong login
            setMessage((
                <div className="error">
                    <ErrorIcon className="error-icon" /> {/* Use the ErrorOutlineRoundedIcon icon */}
                    <Typography variant="body1" color="error" className="error-text">
                        Invalid username or password
                    </Typography>
                </div>
            ));
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
                minHeight: '85vh', // Set the minimum height to 60% of the viewport height
            }}
        >
            <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                {message}
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
