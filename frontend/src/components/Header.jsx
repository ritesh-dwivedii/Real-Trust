import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

function Header({ rightContent = null, logoTo = '/' }) {
  const location = useLocation();

  // Helper to scroll to anchor on the landing page
  const handleNavClick = (e, anchor) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{ px: 0, boxShadow: 1, mb: 0 }}>
      <Toolbar disableGutters sx={{ px: 0 }}>
        <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', display: 'flex', alignItems: 'center', px: { xs: 2, md: 6 } }}>
          <RouterLink to={logoTo} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/vite.svg" alt="Logo" style={{ height: 32, marginRight: 12, verticalAlign: 'middle' }} />
          </RouterLink>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/#projects" onClick={e => handleNavClick(e, 'projects')} sx={{ textTransform: 'none' }}>Projects</Button>
            <Button color="inherit" component={RouterLink} to="/#clients" onClick={e => handleNavClick(e, 'clients')} sx={{ textTransform: 'none' }}>Clients</Button>
            <Button color="inherit" component={RouterLink} to="/#contact" onClick={e => handleNavClick(e, 'contact')} sx={{ textTransform: 'none' }}>Contact</Button>
          </Box>
          {rightContent}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header; 