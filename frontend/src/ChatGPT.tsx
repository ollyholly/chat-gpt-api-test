import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import styled from 'styled-components';

const ResponseBox = styled.div`
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const today = new Date();
const day = today.getDate(); 
const month = today.getMonth() + 1;

const ChatGPT = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');

  const prompts = [
    { value: 'Give me a quote.', label: 'Quote' },
    { value: `Give me a random historic event that happended on ${month} ${day}`, label: 'Event' },
    { value: 'Tell me a joke', label: 'Joke' },
  ];

  const handlePromptChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPrompt(event.target.value as string);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const messages = [
        { role: "user", content: input || prompt },
      ];
  
      const result = await axios.post('http://localhost:4000/api/chat', { messages });
      setResponse(result.data.content);
    } catch (error) {
      console.error('Error fetching GPT-3 response:', error);
      setResponse('An error occurred.');
    }
  };
  


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Chat GPT
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Prompts</InputLabel>
          <Select value={prompt} onChange={handlePromptChange} label="Prompts">
            {prompts.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          placeholder="Enter your custom prompt"
          value={input}
          onChange={handleInputChange}
        />
        <Button variant="contained" type="submit" fullWidth>
          Send
        </Button>
        {response && (
          <ResponseBox>
            <Typography>{response}</Typography>
          </ResponseBox>
        )}
      </form>
    </Container>
  );
};

export default ChatGPT;