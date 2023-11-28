import { useContext, useEffect, useState } from 'react';
import {
    Typography,
    TextField,
    Button,
    Container,
    Grid,
    Avatar,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import './LoginForm.css';
import { AuthContext } from '../../context/AuthProvider';
import { ServerAPIContext } from '../../context/ServerAPIProvider';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [token, setToken] = useContext(AuthContext);
    const [serverAPI] = useContext(ServerAPIContext);
    const [loadingState, setLoadingState] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (token && token.length > 50) {
            navigate("/");
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingState(true);

        const response = await fetch(serverAPI + "/token", {
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
        setLoadingState(false);
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
            <Typography variant="h4" marginBottom={'0.3em'}>
                지식인 자동답변 관리자
            </Typography>
            <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
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
                            disabled={loadingState}
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
                            disabled={loadingState}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} marginTop={'1em'}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loadingState}
                        >
                            {!loadingState ? 'Login' :
                                (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: green[500],
                                            zIndex: 1,
                                        }}
                                    />
                                )}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default LoginForm;
