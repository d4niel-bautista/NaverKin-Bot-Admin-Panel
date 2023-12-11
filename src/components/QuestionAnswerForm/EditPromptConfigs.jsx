import React, { useEffect } from 'react';
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

const PromptConfig = ({ description, id, promptConfigs, setPromptConfigs, questionText = { 'title': '', 'content': '' } }) => {
    const onTextChange = (e) => {
        setPromptConfigs((promptConfigs) => ({
            ...promptConfigs,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        const processQuestionText = (questionText) => {
            if (questionText['title'] !== '' && questionText['content'] !== '') {
                setPromptConfigs((promptConfigs) => ({
                    ...promptConfigs,
                    query: questionText['title'] + '\n\n' + questionText['content']
                }));
            } else {
                for (const value of Object.values(questionText)) {
                    if (value !== '') {
                        setPromptConfigs((promptConfigs) => ({
                            ...promptConfigs,
                            query: value
                        }));
                    }
                }
            }
        };
        processQuestionText(questionText);
    }, []);

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

const EditPromptConfigs = ({ closeModal, isModalOpen, token, serverAPI, questionPromptConfigs, setQuestionPromptConfigs, answerAdvertisementPromptConfigs, setAnswerAdvertisementPromptConfigs, answerExposurePromptConfigs, setAnswerExposurePromptConfigs, prohibitedWords, setProhibitedWords, questionText }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        let promptConfigsUpdate = {};
        promptConfigsUpdate['question'] = questionPromptConfigs;
        promptConfigsUpdate['answer_advertisement'] = answerAdvertisementPromptConfigs;
        promptConfigsUpdate['answer_exposure'] = answerExposurePromptConfigs;
        promptConfigsUpdate['prohibited_words'] = prohibitedWords;

        const response = await fetch(serverAPI + "/prompt_configs", {
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
                            setPromptConfigs={setAnswerAdvertisementPromptConfigs}
                            questionText={questionText} />
                        <Divider sx={{ my: 2 }} />
                        <PromptConfig description={"Answer 2 (Exposure)"}
                            id={"answer_exposure"}
                            promptConfigs={answerExposurePromptConfigs}
                            setPromptConfigs={setAnswerExposurePromptConfigs}
                            questionText={questionText} />
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