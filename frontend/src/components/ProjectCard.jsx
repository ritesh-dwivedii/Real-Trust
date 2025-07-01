import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

function ProjectCard({ image, name, description }) {
  return (
    <Card elevation={2} sx={{ maxWidth: 345, m: 'auto' }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} disabled>
          Read More
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProjectCard; 