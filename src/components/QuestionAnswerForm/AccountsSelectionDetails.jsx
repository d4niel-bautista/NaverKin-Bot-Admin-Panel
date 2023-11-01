import { Grid, MenuItem, TextField } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SERVER } from '../../App';
import { AuthContext } from '../../context/AuthProvider';

const AccountsSelectionDetails = ({ formType, setAlert }) => {
    const [interactions, setInteractions] = useState([]);
    const [token] = useContext(AuthContext);
    const menuItems = useRef([]);

    useEffect(() => {
        const fetchInteractions = async () => {
            const response = await fetch(SERVER + "/interactions", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok){
                const data = await response.json();
                setInteractions(data);
            }
        };
        fetchInteractions();
    }, []);

    return (
        <Grid container spacing={2}>
            {formType === "1:1" ?
                <>
                    <Grid item sm={6} textAlign={'center'}>
                        <TextField
                            select
                            label="QuestionBot ID"
                            name='question'
                            sx={{ width: '200px' }}
                            defaultValue={"0"}
                        >
                            <MenuItem value="0">--</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item sm={6} textAlign={'center'}>
                        <TextField
                            select
                            label="AnswerBot ID"
                            name='question'
                            sx={{ width: '200px' }}
                            defaultValue={"0"}
                        >
                            <MenuItem value="0">--</MenuItem>
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
                            defaultValue={"0"}
                        >
                            <MenuItem value="0">--</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item sm={4} textAlign={'center'}>
                        <TextField
                            select
                            label="AnswerBot(Advertisement) ID"
                            name='answer_advertisement'
                            sx={{ width: '200px' }}
                            defaultValue={"0"}
                        >
                            <MenuItem value="0">--</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item sm={4} textAlign={'center'}>
                        <TextField
                            select
                            label="AnswerBot(Exposure) ID"
                            name='answer_exposure'
                            sx={{ width: '200px' }}
                            defaultValue={"0"}
                        >
                            <MenuItem value="0">--</MenuItem>
                        </TextField>
                    </Grid>
                </>
            }
        </Grid>
    )
}

export default AccountsSelectionDetails;