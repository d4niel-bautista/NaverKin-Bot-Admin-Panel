import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Divider,
    Grid,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PromptConfig = ({ description, id, promptConfigs, setPromptConfigs }) => {
    const onTextChange = (e) => {
        setPromptConfigs((promptConfigs) => ({
            ...promptConfigs,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            <Typography variant="body1">
                {description}
            </Typography>
            <TextField
                label="Query"
                name="query"
                id={id + "_query"}
                fullWidth
                margin="dense"
                rows={2}
                multiline
                value={promptConfigs['query']}
                onChange={onTextChange}
            />
            <TextField
                label="Prompt"
                name="prompt"
                id={id + "_prompt"}
                fullWidth
                margin={"dense"}
                rows={4}
                multiline
                value={promptConfigs['prompt']}
                onChange={onTextChange}
            />
        </>
    );
}

const EditPromptConfigs = ({ closeModal, isModalOpen, token }) => {
    const [questionPromptConfigs, setQuestionPromptConfigs] = useState({ 'query': '', 'prompt': '' });
    const [answerAdvertisementPromptConfigs, setAnswerAdvertisementPromptConfigs] = useState({ 'query': '', 'prompt': '' });
    const [answerExposurePromptConfigs, setAnswerExposurePromptConfigs] = useState({ 'query': '', 'prompt': '' });
    const [prohibitedWords, setProhibitedWords] = useState("");

    useEffect(() => {
        const getPromptConfigs = async () => {
            const response = await fetch("http://localhost:8000/v1/api/prompt_configs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setQuestionPromptConfigs({ 'query': data['question']['query'], 'prompt': data['question']['prompt'] });
                setAnswerAdvertisementPromptConfigs({ 'query': data['answer_advertisement']['query'], 'prompt': data['answer_advertisement']['prompt'] });
                setAnswerExposurePromptConfigs({ 'query': data['answer_exposure']['query'], 'prompt': data['answer_exposure']['prompt'] });
                setProhibitedWords(data['prohibited_words']);
            }
        }
        getPromptConfigs();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let promptConfigsUpdate = {};
        promptConfigsUpdate['question'] = questionPromptConfigs;
        promptConfigsUpdate['answer_advertisement'] = answerAdvertisementPromptConfigs;
        promptConfigsUpdate['answer_exposure'] = answerExposurePromptConfigs;
        promptConfigsUpdate['prohibited_words'] = prohibitedWords;

        const response = await fetch("http://localhost:8000/v1/api/prompt_configs", {
            method: "POST", body: JSON.stringify(promptConfigsUpdate),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        if (response.ok) {
            console.log(await response.json());
        }
        closeModal();
    };

    return (
        <Dialog open={isModalOpen} onClose={closeModal} maxWidth='md' fullWidth>
            <DialogTitle>
                Prompt Configs
                <IconButton onClick={closeModal} sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8
                }}>
                    <CloseIcon sx={{ fontSize: 32 }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <PromptConfig description={"Question"}
                            id={"answer_advertisement"}
                            promptConfigs={questionPromptConfigs}
                            setPromptConfigs={setQuestionPromptConfigs} />
                        <Divider sx={{ my: 2 }} />
                        <PromptConfig description={"Answer 1 (Advertisement)"}
                            id={"answer_advertisement"}
                            promptConfigs={answerAdvertisementPromptConfigs}
                            setPromptConfigs={setAnswerAdvertisementPromptConfigs} />
                        <Divider sx={{ my: 2 }} />
                        <PromptConfig description={"Answer 2 (Exposure)"}
                            id={"answer_exposure"}
                            promptConfigs={answerExposurePromptConfigs}
                            setPromptConfigs={setAnswerExposurePromptConfigs} />
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body1">
                            Prohibited Words
                        </Typography>
                        <TextField
                            label="List"
                            name="prohibited_words"
                            fullWidth
                            margin="dense"
                            rows={20}
                            multiline
                            value={prohibitedWords}
                            onChange={(e) => setProhibitedWords(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPromptConfigs;