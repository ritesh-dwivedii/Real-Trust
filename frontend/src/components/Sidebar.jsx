import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Manage Projects', to: '/admin/projects' },
  { label: 'Manage Clients', to: '/admin/clients' },
  { label: 'Contact Submissions', to: '/admin/contacts' },
  { label: 'Newsletter Subscribers', to: '/admin/subscribers' },
];

function Sidebar({ onLogout }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 220, boxSizing: 'border-box', bgcolor: '#f8f9fa', borderRight: '1px solid #eaeaea' },
      }}
    >
      <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>Admin Panel</Typography>
      <List>
        {sidebarItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={NavLink} to={item.to} sx={{ '&.active': { borderLeft: '4px solid #007bff', bgcolor: '#eaeaea', color: '#007bff' } }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={onLogout} sx={{ color: 'error.main' }}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar; 