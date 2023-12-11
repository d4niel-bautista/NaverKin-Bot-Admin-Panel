import { useContext, useEffect, useState } from 'react';
import { Box, Card, CardContent, Divider, Button, TextField, MenuItem, Grid, IconButton, Backdrop, CircularProgress } from '@mui/material';
import QuestionArea from './QuestionArea';
import AnswerArea from './AnswerArea';
import EditPromptConfigs from './EditPromptConfigs';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { AuthContext } from '../../context/AuthProvider';
import { ServerAPIContext } from '../../context/ServerAPIProvider';
import AccountsSelection from './AccountsSelection';

const QuestionAnswerForm = () => {
    const [formType, setFormType] = useState("1:2")
    const [questionText, setQuestionText] = useState({ 'title': '', 'content': '' });
    const [answer1Text, setAnswer1Text] = useState({ 'content': '', 'postscript': '' });
    const [answer2Text, setAnswer2Text] = useState({ 'content': '', 'postscript': '' });
    const [loadingState, setLoadingState] = useState(false);
    const [promptConfigsOpen, setPromptConfigsOpen] = useState(false);
    const [accountsSelection, setAccountsSelection] = useState(false);
    const [questionPromptConfigs, setQuestionPromptConfigs] = useState({ 'query': '', 'prompt': '' });
    const [answerAdvertisementPromptConfigs, setAnswerAdvertisementPromptConfigs] = useState({ 'query': '', 'prompt': '' });
    const [answerExposurePromptConfigs, setAnswerExposurePromptConfigs] = useState({ 'query': '', 'prompt': '' });
    const [prohibitedWords, setProhibitedWords] = useState("");
    const [interactions, setInteractions] = useState([]);
    const [token] = useContext(AuthContext);
    const [serverAPI] = useContext(ServerAPIContext);

    useEffect(() => {
        const getPromptConfigs = async () => {
            const response = await fetch(serverAPI + "/prompt_configs", {
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
        const fetchInteractions = async () => {
            const response = await fetch(serverAPI + "/interactions", {
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
        getPromptConfigs();
    }, [])

    const handleTextChange = (field, text) => {
        switch (field) {
            case 'question':
                setQuestionText(text);
                break;
            case 'answer1':
                setAnswer1Text(text);
                break;
            case 'answer2':
                setAnswer2Text(text);
                break;
            default:
                break;
        }
    };

    const changeFormType = (e) => {
        setFormType(e.target.value);
    }

    const generateContent = async () => {
        setLoadingState(true);
        const response = await fetch(serverAPI + "/generate_form_content", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        if (response.ok) {
            const data = await response.json();
            setQuestionText(data['question']);
            setAnswer1Text({ 'content': data['answer_advertisement'], 'postscript': answer1Text['postscript'] });
            setAnswer2Text({ 'content': data['answer_exposure'], 'postscript': answer2Text['postscript'] });
        }
        setLoadingState(false);
    }

    const handleSubmit = async (e, selectedAccounts) => {
        setLoadingState(true);
        e.preventDefault();

        let questionForm = { 'question': {}, 'answer_advertisement': {} }
        questionForm['question']['content'] = questionText;
        questionForm['question']['id'] = selectedAccounts.question;
        if (formType === "1:1") {
            questionForm['answer_advertisement']['content'] = answer1Text.postscript !== "" ? answer1Text.content + "\n\n" + answer1Text.postscript : answer1Text.content;
            questionForm['answer_advertisement']['id'] = selectedAccounts.answer_advertisement;
        } else if ((formType === "1:2")) {
            questionForm['answer_advertisement']['content'] = answer1Text.postscript !== "" ? answer1Text.content + "\n\n" + answer1Text.postscript : answer1Text.content;
            questionForm['answer_advertisement']['id'] = selectedAccounts.answer_advertisement;
            questionForm['answer_exposure'] = {};
            questionForm['answer_exposure']['content'] = answer2Text.postscript !== "" ? answer2Text.content + "\n\n" + answer2Text.postscript : answer2Text.content;
            questionForm['answer_exposure']['id'] = selectedAccounts.answer_exposure;
        }

        const response = await fetch(serverAPI + "/question_answer", {
            method: "POST", body: JSON.stringify(questionForm),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        if (response.ok) {
            console.log(await response.json());
        }

        setLoadingState(false);
    };

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingState}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Card variant="outlined" sx={{ width: '50%', boxShadow: 3 }}>
                    <CardContent>
                        <Grid container spacing={2} paddingTop={"24px"} paddingX={"16px"}
                            alignItems={"center"}>
                            <Grid item xs={6} textAlign="left">
                                <TextField
                                    id="form_type"
                                    select
                                    label="Form Type"
                                    name='form_type'
                                    sx={{ width: '200px' }}
                                    onChange={changeFormType}
                                    defaultValue={"1:2"}
                                    disabled={loadingState}
                                >
                                    <MenuItem value="1:1">1 Question, 1 Answer</MenuItem>
                                    <MenuItem value="1:2">1 Question, 2 Answers(Exposure & Advertisement)</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={5} textAlign="right">
                                <Button variant="contained" color="primary"
                                    onClick={generateContent}
                                    disabled={loadingState}>
                                    Generate Content
                                </Button>
                            </Grid>
                            <Grid item xs={1} textAlign="center">
                                <IconButton onClick={() => setPromptConfigsOpen(true)}
                                    disabled={loadingState}>
                                    <SettingsOutlinedIcon sx={{ fontSize: 32 }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                        <QuestionArea questionText={questionText} onTextChange={(text) => handleTextChange('question', text)} loadingState={loadingState} />
                        <Divider sx={{ my: 2 }} />
                        {formType === "1:1" ?
                            <AnswerArea answerText={answer1Text}
                                componentTitle='Answer'
                                componentDesc='Answer to the question.'
                                componentId='answer'
                                onTextChange={(text) => handleTextChange('answer1', text)} /> :
                            <>
                                <AnswerArea answerText={answer1Text}
                                    componentTitle='Answer 1 (Advertisement)'
                                    componentDesc='Answer that advertises used by a low level ID.'
                                    componentId='advertising_answer'
                                    onTextChange={(text) => handleTextChange('answer1', text)}
                                    loadingState={loadingState} />
                                <Divider sx={{ my: 2 }} />
                                <AnswerArea answerText={answer2Text}
                                    componentTitle='Answer 2 (Exposure)'
                                    componentDesc='Answer that gives general information used by a high level ID. Used for exposure to show up in top-ranked results.'
                                    componentId='exposure_answer'
                                    onTextChange={(text) => handleTextChange('answer2', text)}
                                    loadingState={loadingState} />
                            </>
                        }
                        <Divider sx={{ my: 2 }} />
                        <Box display="flex" justifyContent="center">
                            <Button variant="contained" color="primary" sx={{ mt: 3, fontSize: '1.5rem' }}
                                onClick={() => setAccountsSelection(true)}
                                disabled={loadingState}>
                                Submit
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            {promptConfigsOpen && (<EditPromptConfigs closeModal={() => setPromptConfigsOpen(false)} isModalOpen={promptConfigsOpen} token={token} serverAPI={serverAPI}
                questionPromptConfigs={questionPromptConfigs}
                setQuestionPromptConfigs={setQuestionPromptConfigs}
                answerAdvertisementPromptConfigs={answerAdvertisementPromptConfigs}
                setAnswerAdvertisementPromptConfigs={setAnswerAdvertisementPromptConfigs}
                answerExposurePromptConfigs={answerExposurePromptConfigs}
                setAnswerExposurePromptConfigs={setAnswerExposurePromptConfigs}
                prohibitedWords={prohibitedWords}
                setProhibitedWords={setProhibitedWords}
                questionText={questionText}
            />)}
            {accountsSelection && (<AccountsSelection open={accountsSelection} handleClose={() => setAccountsSelection(false)} formType={formType} handleSubmit={handleSubmit} interactions={interactions} />)}
        </>
    );
};

export default QuestionAnswerForm;