import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

const QuestionArea = ({ questionDesc = 'Create a question to be posted on Naver Kin.', onTextChange }) => {
  const descriptionLines = questionDesc.split('\n');

  const handleTextChange = () => {
    let title = document.querySelector('textarea[id="questionTitle"]').value;
    let content = document.querySelector('textarea[id="questionContent"]').value;
    onTextChange({ title, content });
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h5" gutterBottom>
        Question
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
      <form>
        <TextField
          id='questionTitle'
          label="Title"
          variant="outlined"
          fullWidth
          multiline
          margin="normal"
          onChange={handleTextChange}
        />
        <TextField
          id='questionContent'
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={8}
          margin="normal"
          sx={{ marginBottom: 2 }}
          onChange={handleTextChange}
        />
      </form>
    </Box>
  );
};

export default QuestionArea;
