import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Divider
} from '@mui/material';

const EditPromptConfigs = ({ openModal, closeModal, isModalOpen }) => {
    const [promptContent, setPromptContent] = useState({ 'query': '', 'prompt': '', 'prohibited_words': '' });

    useEffect(() => {
        const getPromptConfigs = async () => {
            const response = await fetch("http://localhost:8000/v1/api/prompt_configs", { method: "GET" });

            console.log(await response.json())
        }
        getPromptConfigs();
    }, [])

    const handleSubmit = () => {
        // You can handle the form data here, for example, by sending it to an API.
        console.log(promptContent);
        closeModal();
    };

    return (
        <Dialog open={isModalOpen} onClose={closeModal} maxWidth='md' fullWidth>
            <DialogTitle>
                    Prompt Configs
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Question
                </Typography>
                <TextField
                    label="Query"
                    name="question_query"
                    fullWidth
                    margin="dense"
                    rows={4}
                    multiline
                />
                <TextField
                    label="Prompt"
                    name="question_prompt"
                    fullWidth
                    margin={"dense"}
                    rows={4}
                    multiline
                />
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">
                    Answer 1 (Advertisement)
                </Typography>
                <TextField
                    label="Query"
                    name="answer1_query"
                    fullWidth
                    margin="dense"
                    rows={4}
                    multiline
                />
                <TextField
                    label="Prompt"
                    name="answer1_prompt"
                    fullWidth
                    margin="dense"
                    rows={4}
                    multiline
                />
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">
                    Answer 2 (Exposure)
                </Typography>
                <TextField
                    label="Query"
                    name="answer2_query"
                    fullWidth
                    margin="dense"
                    rows={4}
                    multiline
                />
                <TextField
                    label="Prompt"
                    name="answer2_prompt"
                    fullWidth
                    margin="dense"
                    rows={4}
                    multiline
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
                <Button onClick={closeModal} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPromptConfigs;