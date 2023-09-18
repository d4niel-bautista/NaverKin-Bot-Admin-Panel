import { useState } from 'react';
import { Box, Card, CardContent, Divider, Button } from '@mui/material';
import QuestionArea from './QuestionArea';
import AnswerArea from './AnswerArea';

const QuestionAnswerForm = () => {
    const [questionText, setQuestionText] = useState({title: '', content: ''});
    const [answer1Text, setAnswer1Text] = useState({content: '', postscript: ''});
    const [answer2Text, setAnswer2Text] = useState({content: '', postscript: ''});

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

    const handleSubmit = () => {
        console.log('Question:', questionText);
        console.log('Answer 1:', answer1Text);
        console.log('Answer 2:', answer2Text);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <Card variant="outlined" sx={{ width: '50%', boxShadow: 3 }}>
                <CardContent sx={{ maxHeight: '85vh', overflowY: 'auto' }}>
                    <QuestionArea onTextChange={(text) => handleTextChange('question', text)}/>
                    <Divider sx={{ my: 2 }} />
                    <AnswerArea componentTitle='Answer 1 (Advertisement)'
                                componentDesc='Answer that advertises used by a low level ID.'
                                componentId='advertisingAnswer'
                                onTextChange={(text) => handleTextChange('answer1', text)} />
                    <Divider sx={{ my: 2 }} />
                    <AnswerArea componentTitle='Answer 2 (Exposure)'
                                componentDesc='Answer that gives general information used by a high level ID. Used for exposure to show up in top-ranked results.'
                                componentId='exposureAnswer'
                                onTextChange={(text) => handleTextChange('answer2', text)} />
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" sx={{ mt: 3, fontSize: '1.5rem' }}
                                onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default QuestionAnswerForm;
