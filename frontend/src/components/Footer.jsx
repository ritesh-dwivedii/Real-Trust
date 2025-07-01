import React from 'react';
import { Box, Grid, Typography, Link, Divider } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#232a36', color: '#fff', pt: 6, pb: 2, mt: 4, px: 0 }}>
      <Grid container spacing={4} sx={{ px: { xs: 2, md: 6 } }}>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ bgcolor: '#fff', color: '#232a36', display: 'flex', alignItems: 'center', px: 2, py: 0.5, borderRadius: 1, fontWeight: 700, mb: 1 }}>
              <img src="/vite.svg" alt="Logo" style={{ height: 28, marginRight: 8, verticalAlign: 'middle' }} />
            
            </Box>
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Building trust through quality real estate solutions and exceptional service.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Quick Links</Typography>
          <Box>
            <Link href="#projects" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>Projects</Link>
            <Link href="#clients" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>Clients</Link>
            <Link href="#contact" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>Contact</Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Services</Typography>
          <Box>
            <Typography variant="body2" sx={{ mb: 0.5 }}>Residential Development</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>Commercial Properties</Typography>
            <Typography variant="body2">Property Management</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Contact Info</Typography>
          <Box>
            <Typography variant="body2" sx={{ mb: 0.5 }}>riteshdmca25@ipsacademy.org</Typography>
            <Typography variant="body2">Vishnupuri, Indore</Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 3 }} />
      <Typography variant="body2" align="center" sx={{ color: '#bbb' }}>
        © 2025 Real Trust. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer; 