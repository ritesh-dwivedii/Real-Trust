import React, { useEffect, useState } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, CircularProgress, Alert, Card, CardContent, Grid, List as MuiList, ListItem as MuiListItem, ListItemText as MuiListItemText, Divider
} from '@mui/material';
import {
  fetchAdminProjects, addProject, deleteProject,
  fetchAdminClients, addClient, deleteClient,
  fetchContacts, fetchSubscribers
} from '../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const sidebarItems = [
  'Dashboard',
  'Manage Projects',
  'Manage Clients',
  'Contact Submissions',
  'Newsletter Subscribers',
];

function AdminPanel() {
  const [selected, setSelected] = useState(0);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [projectForm, setProjectForm] = useState({ name: '', description: '', image: '' });
  const [clientForm, setClientForm] = useState({ name: '', description: '', designation: '', image: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch data for the selected section
  useEffect(() => {
    setError(''); setSuccessMsg('');
    if (!token) { navigate('/admin/login'); return; }
    setLoading(true);
    const fetchData = async () => {
      try {
        if (selected === 0) {
          setProjects(await fetchAdminProjects(token));
          setClients(await fetchAdminClients(token));
          setContacts(await fetchContacts(token));
          setSubscribers(await fetchSubscribers(token));
        }
        if (selected === 1) setProjects(await fetchAdminProjects(token));
        if (selected === 2) setClients(await fetchAdminClients(token));
        if (selected === 3) setContacts(await fetchContacts(token));
        if (selected === 4) setSubscribers(await fetchSubscribers(token));
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [selected, token]);

  // Add Project
  const handleAddProject = async e => {
    e.preventDefault(); setError(''); setSuccessMsg('');
    try {
      await addProject(projectForm, token);
      setSuccessMsg('Project added!');
      setProjectForm({ name: '', description: '', image: '' });
      setProjects(await fetchAdminProjects(token));
    } catch {
      setError('Failed to add project.');
    }
  };
  // Delete Project
  const handleDeleteProject = async id => {
    setError(''); setSuccessMsg('');
    try {
      await deleteProject(id, token);
      setSuccessMsg('Project deleted!');
      setProjects(await fetchAdminProjects(token));
    } catch {
      setError('Failed to delete project.');
    }
  };
  // Add Client
  const handleAddClient = async e => {
    e.preventDefault(); setError(''); setSuccessMsg('');
    try {
      await addClient(clientForm, token);
      setSuccessMsg('Client added!');
      setClientForm({ name: '', description: '', designation: '', image: '' });
      setClients(await fetchAdminClients(token));
    } catch {
      setError('Failed to add client.');
    }
  };
  // Delete Client
  const handleDeleteClient = async id => {
    setError(''); setSuccessMsg('');
    try {
      await deleteClient(id, token);
      setSuccessMsg('Client deleted!');
      setClients(await fetchAdminClients(token));
    } catch {
      setError('Failed to delete client.');
    }
  };
  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const logoutButton = (
    <Button color="error" variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );

  // Header height (default MUI AppBar is 64px on desktop)
  const HEADER_HEIGHT = 64;
  const DRAWER_WIDTH = 220;

  return (
    <>
      <Header rightContent={logoutButton} />
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          position: 'fixed',
          left: 0,
          top: HEADER_HEIGHT,
          height: `calc(100vh - ${HEADER_HEIGHT}px)` ,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: '#f8f9fa',
            borderRight: '1px solid #eaeaea',
            top: HEADER_HEIGHT,
            left: 0,
            height: `calc(100vh - ${HEADER_HEIGHT}px)` ,
          },
        }}
      >
        <List>
          {sidebarItems.map((text, idx) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                selected={selected === idx}
                onClick={() => setSelected(idx)}
                sx={{ '&.Mui-selected': { borderLeft: '4px solid #007bff', bgcolor: '#eaeaea', color: '#007bff' } }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa', pt: `${HEADER_HEIGHT}px`, ml: `${DRAWER_WIDTH}px` }}>
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}
          {/* Dashboard */}
          {selected === 0 && <>
            <Typography variant="h5" gutterBottom>Welcome to the Admin Dashboard</Typography>
            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Projects</Typography>
                    <Typography variant="h4">{projects.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Clients</Typography>
                    <Typography variant="h4">{clients.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Contacts</Typography>
                    <Typography variant="h4">{contacts.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">Subscribers</Typography>
                    <Typography variant="h4">{subscribers.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {/* Recent Activity Feed */}
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Recent Activity</Typography>
            <MuiList sx={{ bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
              {/* Recent Contacts */}
              {contacts.slice(-3).reverse().map((c, idx) => (
                <MuiListItem key={c._id || idx}>
                  <MuiListItemText
                    primary={`New contact: ${c.fullName}`}
                    secondary={`${c.email} • ${c.city}`}
                  />
                </MuiListItem>
              ))}
              {/* Recent Projects */}
              {projects.slice(-2).reverse().map((p, idx) => (
                <MuiListItem key={p._id || idx}>
                  <MuiListItemText
                    primary={`New project: ${p.name}`}
                    secondary={p.description}
                  />
                </MuiListItem>
              ))}
              {/* Recent Clients */}
              {clients.slice(-2).reverse().map((c, idx) => (
                <MuiListItem key={c._id || idx}>
                  <MuiListItemText
                    primary={`New client: ${c.name}`}
                    secondary={c.designation}
                  />
                </MuiListItem>
              ))}
              {(contacts.length + projects.length + clients.length === 0) && (
                <MuiListItem>
                  <MuiListItemText primary="No recent activity yet." />
                </MuiListItem>
              )}
            </MuiList>
            <Divider sx={{ my: 3 }} />
          </>}
          {/* Manage Projects */}
          {selected === 1 && <>
            <Typography variant="h5" gutterBottom>Manage Projects</Typography>
            <Paper sx={{ mb: 3, p: 2 }}>
              <Box component="form" onSubmit={handleAddProject} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField label="Name" name="name" value={projectForm.name} onChange={e => setProjectForm(f => ({ ...f, name: e.target.value }))} required />
                <TextField label="Description" name="description" value={projectForm.description} onChange={e => setProjectForm(f => ({ ...f, description: e.target.value }))} required />
                <TextField label="Image URL" name="image" value={projectForm.image} onChange={e => setProjectForm(f => ({ ...f, image: e.target.value }))} />
                <Button variant="contained" color="primary" type="submit">Add Project</Button>
              </Box>
            </Paper>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map(p => (
                    <TableRow key={p._id}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.description}</TableCell>
                      <TableCell>{p.image ? <img src={p.image} alt={p.name} style={{ width: 60, borderRadius: 4 }} /> : '-'}</TableCell>
                      <TableCell>
                        {/* Edit can be added here */}
                        <Button size="small" color="error" onClick={() => handleDeleteProject(p._id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>}
          {/* Manage Clients */}
          {selected === 2 && <>
            <Typography variant="h5" gutterBottom>Manage Clients</Typography>
            <Paper sx={{ mb: 3, p: 2 }}>
              <Box component="form" onSubmit={handleAddClient} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField label="Name" name="name" value={clientForm.name} onChange={e => setClientForm(f => ({ ...f, name: e.target.value }))} required />
                <TextField label="Description" name="description" value={clientForm.description} onChange={e => setClientForm(f => ({ ...f, description: e.target.value }))} required />
                <TextField label="Designation" name="designation" value={clientForm.designation} onChange={e => setClientForm(f => ({ ...f, designation: e.target.value }))} required />
                <TextField label="Image URL" name="image" value={clientForm.image} onChange={e => setClientForm(f => ({ ...f, image: e.target.value }))} />
                <Button variant="contained" color="primary" type="submit">Add Client</Button>
              </Box>
            </Paper>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map(c => (
                    <TableRow key={c._id}>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{c.description}</TableCell>
                      <TableCell>{c.designation}</TableCell>
                      <TableCell>{c.image ? <img src={c.image} alt={c.name} style={{ width: 60, borderRadius: 4 }} /> : '-'}</TableCell>
                      <TableCell>
                        {/* Edit can be added here */}
                        <Button size="small" color="error" onClick={() => handleDeleteClient(c._id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>}
          {/* Contact Submissions */}
          {selected === 3 && <>
            <Typography variant="h5" gutterBottom>Contact Submissions</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>City</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts.map(c => (
                    <TableRow key={c._id}>
                      <TableCell>{c.fullName}</TableCell>
                      <TableCell>{c.email}</TableCell>
                      <TableCell>{c.mobile}</TableCell>
                      <TableCell>{c.city}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>}
          {/* Newsletter Subscribers */}
          {selected === 4 && <>
            <Typography variant="h5" gutterBottom>Newsletter Subscribers</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Date Subscribed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subscribers.map(s => (
                    <TableRow key={s._id}>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>{s.createdAt ? new Date(s.createdAt).toLocaleString() : '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>}
        </Box>
      </Box>
    </>
  );
}

export default AdminPanel; 