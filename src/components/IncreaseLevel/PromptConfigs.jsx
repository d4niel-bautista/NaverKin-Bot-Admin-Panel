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
            <Grid item md={12}>
                {/* <TextField select label="Category" name="description" defaultValue={''} sx={{ width: '160px', marginRight: 2 }} onChange={(e) => setPromptConfigs({ 'id': e.target.value['id'], 'prompt': e.target.value['prompt'], 'postscript': e.target.value['postscript'], 'prohibited_words': e.target.value['prohibited_words'] })}>
                    {promptConfigsList.map((item) =>
                        <MenuItem key={item.id} value={item}>{item.description}</MenuItem>
                    )}
                </TextField> */}
                <TextField
                    name='prompt'
                    label='Prompt'
                    sx={{ width: '300px', marginRight: 2 }}
                    margin="dense"
                    rows={8}
                    value={promptConfigs.prompt}
                    multiline
                    onChange={changePromptConfigs}
                />
                <TextField
                    name='postscript'
                    label='Postscript'
                    sx={{ width: '200px', marginRight: 2 }}
                    margin="dense"
                    rows={8}
                    value={promptConfigs.postscript}
                    multiline
                    onChange={changePromptConfigs}
                />
                <TextField
                    name='prohibited_words'
                    label='Prohibited Words'
                    sx={{ width: '200px' }}
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