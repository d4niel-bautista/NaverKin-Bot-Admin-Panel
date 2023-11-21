import { Grid, MenuItem, TextField } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SERVER } from '../../App';
import { AuthContext } from '../../context/AuthProvider';
import CircleIcon from '@mui/icons-material/Circle';

const AccountsSelectionDetails = ({ selectedAccounts, formType, setAlert, setDisableSubmitButton }) => {
    const [interactions, setInteractions] = useState([]);
    const conflicts = useRef({ 'answer_advertisement': '', 'answer_exposure': '' });
    const [token] = useContext(AuthContext);

    useEffect(() => {
        const fetchInteractions = async () => {
            const response = await fetch(SERVER + "/interactions", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setInteractions(data);
            }
        };
        fetchInteractions();
    }, []);

    const handleChange = (e) => {
        const account = interactions.find(account => account.id === e.target.value);
        const isDuplicate = Object.values(selectedAccounts.current).includes(e.target.value);
        selectedAccounts.current[e.target.name] = e.target.value;
        const findOtherDuplicates = Object.values(selectedAccounts.current).filter((item, index) => Object.values(selectedAccounts.current).indexOf(item) !== index)

        if (findOtherDuplicates.length === 0 || findOtherDuplicates[0] === 0) {
            if (Object.values(conflicts.current).every((value) => value === '')) {
                setAlert({ 'display': 'none', 'severity': '', 'text': '' });
            }
        } else if (isDuplicate) {
            setAlert({ 'display': 'flex', 'severity': 'error', 'text': `The account ${account.username} is duplicate!` });
            return;
        } else {
            return;
        }

        if (e.target.value === 0) {
            if (e.target.name === 'question') {
                setAlert({ 'display': 'none', 'severity': '', 'text': '' });
            }
        }

        if (selectedAccounts.current.question === 0) {
            setDisableSubmitButton(true);
            return;
        }

        const questionAccount = interactions.find(account => account.id === selectedAccounts.current.question);
        const otherAccounts = { ...selectedAccounts.current };
        delete otherAccounts["question"];

        for (const [key, value] of Object.entries(otherAccounts)) {
            if (value !== 0) {
                const otherAccount = interactions.find(account => account.id === value);
                const regex = new RegExp(questionAccount.username, 'g');
                const interactionsCount = otherAccount.interactions.match(regex);
                if (interactionsCount && interactionsCount.length >= 1) {
                    const conflict = `There ${interactionsCount.length > 1 ? "are" : "is"} ${interactionsCount.length} interaction${interactionsCount.length > 1 ? "s" : ""} between ${questionAccount.username} and ${otherAccount.username}.`;
                    if (Object.entries(conflicts.current).filter(([key, value]) => key !== e.target.name)[0][1] !== conflict) {
                        conflicts.current[key] = conflict;
                    }
                } else {
                    conflicts.current[key] = '';
                }
            } else {
                conflicts.current[key] = '';
            }
        }

        if (formType === "1:2" && selectedAccounts.current['answer_exposure'] > 0) {
            const answer_exposure = interactions.find(account => account.id === selectedAccounts.current['answer_exposure'])
            if (answer_exposure.category === 1) {
                const addNewLine = conflicts.current['answer_exposure'] !== '' ? '\n' : '';
                conflicts.current['answer_exposure'] += `${addNewLine}Account ${answer_exposure.username} on AnswerBot ID (Exposure) is not a high-level ID.`;
            }
        }

        const conflictValues = Object.values(conflicts.current).filter(value => value !== '');
        if (conflictValues.every((value) => value === '')) {
            setAlert({ 'display': 'none', 'severity': '', 'text': '' });
        } else {
            setAlert({ 'display': 'flex', 'severity': 'warning', 'text': conflictValues.join("\n") });
        }

        if (formType === "1:2" && Object.values(selectedAccounts.current).some(id => id === 0)) {
            setDisableSubmitButton(true);
        } else if (formType === "1:1" && selectedAccounts.current.answer_advertisement === 0) {
            setDisableSubmitButton(true);
        } else {
            setDisableSubmitButton(false);
        }
    };

    return (
        <Grid container spacing={2} sx={{ marginTop: '2em' }}>
            {formType === "1:1" ?
                <>
                    <Grid item sm={6} textAlign={'center'}>
                        <TextField
                            select
                            label="QuestionBot ID"
                            name='question'
                            sx={{ width: '200px' }}
                            defaultValue={0}
                            onChange={handleChange}
                        >
                            <MenuItem key={0} value={0}>--</MenuItem>
                            {interactions && interactions.map((item) => {
                                return (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.username}
                                        {item.category > 1 &&
                                            <CircleIcon sx={{ fontSize: 14, marginLeft: 'auto', color: '#f7d547' }} />
                                        }
                                    </MenuItem>
                                );
                            })
                            }
                        </TextField>
                    </Grid>
                    <Grid item sm={6} textAlign={'center'}>
                        <TextField
                            select
                            label="AnswerBot ID"
                            name='answer_advertisement'
                            sx={{ width: '200px' }}
                            defaultValue={0}
                            onChange={handleChange}
                        >
                            <MenuItem key={0} value={0}>--</MenuItem>
                            {interactions && interactions.map((item) => {
                                return (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.username}
                                        {item.category > 1 &&
                                            <CircleIcon sx={{ fontSize: 14, marginLeft: 'auto', color: '#f7d547' }} />
                                        }
                                    </MenuItem>
                                );
                            })
                            }
                        </TextField>
                    </Grid>
                </> :
                <>
                    <Grid item sm={4} textAlign={'center'}>
                        <TextField
                            select
                            label="QuestionBot ID"
                            name='question'
                            sx={{ width: '200px' }}
                            defaultValue={0}
                            onChange={handleChange}
                        >
                            <MenuItem key={0} value={0}>--</MenuItem>
                            {interactions && interactions.map((item) => {
                                return (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.username}
                                        {item.category > 1 &&
                                            <CircleIcon sx={{ fontSize: 14, marginLeft: 'auto', color: '#f7d547' }} />
                                        }
                                    </MenuItem>
                                );
                            })
                            }
                        </TextField>
                    </Grid>
                    <Grid item sm={4} textAlign={'center'}>
                        <TextField
                            select
                            label="AnswerBot ID (Advertisement)"
                            name='answer_advertisement'
                            sx={{ width: '200px' }}
                            defaultValue={0}
                            onChange={handleChange}
                        >
                            <MenuItem key={0} value={0}>--</MenuItem>
                            {interactions && interactions.map((item) => {
                                return (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.username}
                                        {item.category > 1 &&
                                            <CircleIcon sx={{ fontSize: 14, marginLeft: 'auto', color: '#f7d547' }} />
                                        }
                                    </MenuItem>
                                );
                            })
                            }
                        </TextField>
                    </Grid>
                    <Grid item sm={4} textAlign={'center'}>
                        <TextField
                            select
                            label="AnswerBot ID (Exposure)"
                            name='answer_exposure'
                            sx={{ width: '200px' }}
                            defaultValue={0}
                            onChange={handleChange}
                        >
                            <MenuItem key={0} value={0}>--</MenuItem>
                            {interactions && interactions.map((item) => {
                                return (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.username}
                                        {item.category > 1 &&
                                            <CircleIcon sx={{ fontSize: 14, marginLeft: 'auto', color: '#f7d547' }} />
                                        }
                                    </MenuItem>
                                );
                            })
                            }
                        </TextField>
                    </Grid>
                </>
            }
        </Grid>
    )
}

export default AccountsSelectionDetails;