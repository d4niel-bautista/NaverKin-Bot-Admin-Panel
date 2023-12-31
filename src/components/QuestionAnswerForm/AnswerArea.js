import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

const AnswerArea = ({ answerText, answerLabel = 'Content', componentTitle = 'Answer', componentDesc = 'This is for test', componentId, onTextChange, loadingState }) => {
    const descriptionLines = componentDesc.split('\\n');

    const handleTextChange = () => {
        let content = document.querySelector(`textarea[id="${componentId}_answerContent"]`).value;
        let postscript = document.querySelector(`textarea[id="${componentId}_answerPostscript"]`).value;
        const answerText = { content, postscript };
        onTextChange(answerText);
    };

    return (
        <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h5" gutterBottom>
                {componentTitle}
            </Typography>
            {descriptionLines.length > 0 && (
                <Typography variant="body1">
                    {descriptionLines.map((line, index) => (
                        <span key={index}>
                            {line}
                            {index !== descriptionLines.length - 1 && <br />}
                        </span>
                    ))}
                </Typography>
            )}
            <form id={componentId}>
                <TextField
                    id={componentId + '_answerContent'}
                    label={answerLabel}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={8}
                    margin="normal"
                    onChange={handleTextChange}
                    value={answerText.content}
                    disabled={loadingState}
                />
                <TextField
                    id={componentId + '_answerPostscript'}
                    label="Postscript"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={2}
                    margin="normal"
                    onChange={handleTextChange}
                    value={answerText.postscript}
                    disabled={loadingState}
                />
            </form>
        </Box>
    );
};

export default AnswerArea;
