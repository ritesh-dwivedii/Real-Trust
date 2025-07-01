import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api';
import Header from '../components/Header';

function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await adminLogin(form.username, form.password);
      if (res.token) {
        localStorage.setItem('token', res.token);
        navigate('/admin');
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      setError('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8f9fa' }}>
        <Paper elevation={3} sx={{ p: 4, minWidth: 320, maxWidth: 350 }}>
          <Typography variant="h5" align="center" gutterBottom>Admin Login</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Username" name="username" value={form.username} onChange={handleChange} />
            <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
            <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default AdminLogin; 