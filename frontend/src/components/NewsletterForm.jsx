import React, { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';

function NewsletterForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!email) setError('Email is required');
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) setError('Invalid email');
    else {
      setError('');
      onSubmit && onSubmit(email);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 350, mx: 'auto' }}>
      <TextField
        type="email"
        label="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={!!error}
        helperText={error}
        size="small"
      />
      <Button variant="contained" color="primary" type="submit">Subscribe</Button>
    </Box>
  );
}

export default NewsletterForm; 