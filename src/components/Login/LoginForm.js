import { useContext, useEffect, useState } from 'react';
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
import './LoginForm.css';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [token, setToken] = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && token.length > 50) {
            navigate("/");
        };
    }, []);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/v1/api/token", {
            method: "POST",
            body: JSON.stringify(`grant_type=&username=${formData.username}&password=${formData.password}&client_id=&client_secret=`),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });

        const data = await response.json();
        if (response.ok) {
            setMessage((
                <div className="success">
                    <CheckCircleIcon className="success-icon" />
                    <Typography variant="body1" color="success" className="success-text">
                        Logging in...
                    </Typography>
                </div>
            ));
            setToken(data['access_token']);
            navigate("/");
        } else {
            setMessage((
                <div className="error">
                    <ErrorIcon className="error-icon" />
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
                minHeight: '85vh',
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
