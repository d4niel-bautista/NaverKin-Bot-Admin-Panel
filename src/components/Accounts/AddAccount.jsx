import React, { useState } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Container,
    Grid,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
const moment = require('moment');

const AddAccount = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        levelup_id: 0,
        account_url: '',
        recovery_email: '',
        name: '',
        date_of_birth: '',
        gender: '',
        mobile_no: '',
        status: 0,
    });
    const [token] = useOutletContext();

    const handleChange = (e) => {
        let { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            value = checked ? 1 : 0;
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = moment().format('YYYY-MM-DD');
        formData.date_of_birth = formData.date_of_birth === "" ? formData.date_of_birth = currentDate : formData.date_of_birth;

        const response = await fetch("http://localhost:8000/v1/api/add_account", {
            method: "POST", body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
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
                    Add Account
                </Typography>
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="levelup_id"
                                        onChange={handleChange}
                                    />
                                }
                                label="Levelup ID"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Account URL"
                                name="account_url"
                                type="account_url"
                                variant="outlined"
                                value={formData.account_url}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Recovery Email"
                                name="recovery_email"
                                variant="outlined"
                                value={formData.recovery_email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                variant="outlined"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                name="date_of_birth"
                                type="date"
                                variant="outlined"
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="gender"
                                select
                                label="Gender"
                                fullWidth
                                name='gender'
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mobile Number"
                                name="mobile_no"
                                variant="outlined"
                                value={formData.mobile_no}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label='Status'
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                variant="outlined"
                            >
                                <MenuItem value="0">Active</MenuItem>
                                <MenuItem value="1">Disabled</MenuItem>
                            </TextField>
                        </Grid> */}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Add Account
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AddAccount;
