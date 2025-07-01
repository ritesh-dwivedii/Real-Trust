import React from 'react';
import { Paper, Avatar, Typography, Box } from '@mui/material';

function ClientCard({ image, name, designation, testimonial }) {
  return (
    <Paper elevation={1} sx={{ maxWidth: 345, m: 'auto', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar src={image} alt={name} sx={{ width: 64, height: 64, mb: 1 }} />
      <Typography variant="h6">{name}</Typography>
      <Typography variant="subtitle2" color="text.secondary">{designation}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 1, textAlign: 'center' }}>
        "{testimonial}"
      </Typography>
    </Paper>
  );
}

export default ClientCard; 