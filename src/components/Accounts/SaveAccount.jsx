import { Box, FormControlLabel, Checkbox, Grid, MenuItem, TextField, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AlertMessage from '../Alerts/AlertMessage';
import { getObjectNewValues } from '../../utils/getObjectNewValues';
const moment = require('moment');

const SaveAccount = ({ action, account, categories, token, serverAPI, setAccounts }) => {
    const [formData, setFormData] = useState({
        "username": '',
        "password": '',
        "level": '',
        "category": 1,
        "registration_date": '',
        "verified": false,
        "last_login": '',
        "levelup_id": 0,
        "account_url": '',
        "recovery_email": '',
        "name": '',
        "date_of_birth": '',
        "gender": 'Male',
        "mobile_no": '',
        "status": 0,
    });
    const [alertMessage, setAlertMessage] = useState({
        open: false,
        severity: "",
        title: "",
        description: ""
    });

    useEffect(() => {
        if (action === "edit") {
            setFormData(account);
        }
    }, [account]);

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

        var response = null;

        if (action === "add") {
            const currentDate = moment().format('YYYY-MM-DD');
            formData["date_of_birth"] = formData["date_of_birth"] === "" ? formData["date_of_birth"] = currentDate : formData["date_of_birth"];
            formData["registration_date"] = currentDate;

            response = await fetch(serverAPI + "/add_account", {
                method: "POST", body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });
        } else if (action === "edit") {
            var newValues = getObjectNewValues(account, formData);
            if (Object.keys(newValues).length === 0) {
                return;
            }
            newValues['id'] = account['id'];

            response = await fetch(serverAPI + "/update_account", {
                method: "PATCH", body: JSON.stringify(newValues),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });
        }

        if (response.ok) {
            setAlertMessage({ open: true, severity: "success", title: `Account ${action === "add" ? "Added" : "Updated"}`, description: `Account "${formData.username}" is successfully saved` });

            if (action === "add") {
                const data = await response.json();
                setAccounts((accounts) => {
                    const newIndex = accounts[accounts.length - 1].index + 1;
                    data['index'] = newIndex;
                    return [...accounts, data];
                });
            } else if (action === "edit") {
                setAccounts((accounts) =>
                    accounts.map((tempAccount) =>
                        tempAccount.id === newValues.id ? { ...tempAccount, ...newValues } : tempAccount
                    )
                );
            }
        } else if (response.status === 403) {
            setAlertMessage({ open: true, severity: "error", title: "Duplicate Entry", description: `Account "${formData.username}" already exists!` });
        } else {
            setAlertMessage({ open: true, severity: "error", title: `ERROR ${response.status}`, description: `There's problem with the server` });
        }
    };

    return (
        <Box sx={{ border: 1, borderColor: '#e0e0e0', borderRadius: 1, padding: '12px', marginBottom: 2 }}>
            <AlertMessage alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
            <Typography variant='h5' marginBottom={3}>
                {action === "add" ? "Add" : "Edit"} Account
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Grid container
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        maxWidth: '550px',
                        marginLeft: 1
                    }}
                >
                    <Grid item container xs={12} sm={6} md={6} lg={6} sx={{ maxWidth: '270px' }}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                variant="outlined"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                sx={{ maxWidth: '250px', marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                variant="outlined"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                sx={{ maxWidth: '250px', marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                id="category"
                                select
                                label="Category"
                                fullWidth
                                name='category'
                                value={formData.category}
                                onChange={handleChange}
                                sx={{ maxWidth: '250px', marginBottom: 2 }}
                            >
                                {categories && categories.map((category) => {
                                    return <MenuItem key={category.id} value={category.id}>{category.category}</MenuItem>;
                                })}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                fullWidth
                                label="Registration Date"
                                name="registration_date"
                                id="registration_date"
                                type="date"
                                variant="outlined"
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{ maxWidth: '250px', marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="verified"
                                        onChange={handleChange}
                                        sx={{ height: '56px' }}
                                    />
                                }
                                label="Verification"
                                sx={{ maxWidth: '250px', marginBottom: 2 }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} sm={6} md={6} lg={6} sx={{ maxWidth: '270px' }}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                fullWidth
                                label="Recovery Email"
                                name="recovery_email"
                                id="recovery_email"
                                variant="outlined"
                                value={formData.recovery_email}
                                onChange={handleChange}
                                sx={{ maxWidth: '250px', marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                variant="outlined"
                                value={formData.name}
                                onChange={handleChange}
                                sx={{ maxWidth: '250px', marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
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
                                sx={{ maxWidth: '250px', marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                fullWidth
                                label="Mobile Number"
                                name="mobile_no"
                                variant="outlined"
                                value={formData.mobile_no}
                                onChange={handleChange}
                                sx={{ maxWidth: '250px', marginBottom: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                id="gender"
                                select
                                label="Gender"
                                fullWidth
                                name='gender'
                                value={formData.gender}
                                onChange={handleChange}
                                sx={{ maxWidth: '250px', marginBottom: 2 }}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ maxWidth: '300px', marginTop: 2 }}
                    >
                        {action === 'add' ? 'Add' : 'Update'} Account
                    </Button>
                </Grid>
            </form>
        </Box>
    );
};

export default SaveAccount;