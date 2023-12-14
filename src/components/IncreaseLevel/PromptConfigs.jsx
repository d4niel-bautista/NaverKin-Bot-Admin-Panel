import { Grid, TextField } from '@mui/material';
import React from 'react';

const PromptConfigs = ({ promptConfigs, setPromptConfigs }) => {
    const changePromptConfigs = async (e) => {
        const { name, value } = e.target;
        setPromptConfigs({
            ...promptConfigs,
            [name]: value,
        });
    };

    return (
        <>
            {/* <TextField select label="Category" name="description" defaultValue={''} sx={{ width: '160px', marginRight: 2 }} onChange={(e) => setPromptConfigs({ 'id': e.target.value['id'], 'prompt': e.target.value['prompt'], 'postscript': e.target.value['postscript'], 'prohibited_words': e.target.value['prohibited_words'] })}>
                    {promptConfigsList.map((item) =>
                        <MenuItem key={item.id} value={item}>{item.description}</MenuItem>
                    )}
                </TextField> */}
            <Grid item md={12}>
                <TextField
                    name='prompt'
                    label='Prompt'
                    fullWidth
                    sx={{ maxWidth: '50vw' }}
                    margin="dense"
                    rows={8}
                    value={promptConfigs.prompt}
                    multiline
                    onChange={changePromptConfigs}
                />
            </Grid>
            <Grid item md={12}>
                <TextField
                    name='postscript'
                    label='Postscript'
                    fullWidth
                    sx={{ maxWidth: '50vw' }}
                    margin="dense"
                    rows={8}
                    value={promptConfigs.postscript}
                    multiline
                    onChange={changePromptConfigs}
                />
            </Grid>
            <Grid item md={12}>
                <TextField
                    name='prohibited_words'
                    label='Prohibited Words'
                    fullWidth
                    sx={{ maxWidth: '50vw' }}
                    margin="dense"
                    rows={8}
                    value={promptConfigs.prohibited_words}
                    multiline
                    onChange={changePromptConfigs}
                />
            </Grid>
        </>
    );
};

export default PromptConfigs;