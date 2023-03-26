import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Box, Container, Typography, CircularProgress } from '@mui/material';

const PROMPT = `Please provide a one-sentence quote from a fiction book published between 1900 and 2023 that is from a dialogue and does not contain any names of characters or places. Please include the title, author, and year of publishing of the book in this JSON format: { "quote": "text of quote", "title": "the book title", "author": "name of the author", "yearOfPublishing": "year of publishing" }.
Don't add any comments, don't say anything extra.`;

const Quote = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [response, setResponse] = useState({
    author: '',
    quote: '',
    title: '',
    yearOfPublishing: '',
  });

  const getQuote = async () => {
    setError(false);
    try {
      const messages = [{ role: 'user', content: PROMPT }];

      const result = await axios.post('/api/chat', { messages });
      setResponse(JSON.parse(result.data.content));
    } catch (error) {
      console.error('Error fetching GPT-3 response:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom mt={4} mb={4} textAlign="center">
          👦 Quote Boy
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="h5" gutterBottom textAlign="center">
            {'Something went wrong.'}
          </Typography>
        ) : (
          <>
            <Typography variant="h4" gutterBottom textAlign="center">
              {response.quote}
            </Typography>
            <Typography textAlign="center" sx={{ color: '#666666' }}>
              {`${response.author} – "${response.title}", ${response.yearOfPublishing}`}
            </Typography>
          </>
        )}
        <Box
          mt={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={getQuote}
            variant="contained"
            sx={{
              backgroundColor: '#222222',
              '&:hover': {
                backgroundColor: '#333333',
              },
              color: '#fff',
            }}
          >
            Get quote
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Quote;
