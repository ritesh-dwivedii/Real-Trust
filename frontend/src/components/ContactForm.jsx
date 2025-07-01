import React, { useState } from 'react';
import { Box, TextField, Button, Alert, Typography } from '@mui/material';

function ContactForm({ onSubmit }) {
  const [form, setForm] = useState({ fullName: '', email: '', mobile: '', city: '' });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName) errs.fullName = 'Full Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.mobile) errs.mobile = 'Mobile is required';
    if (!form.city) errs.city = 'City is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      onSubmit && onSubmit(form);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Contact Us</Typography>
      <TextField
        label="Full Name"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        error={!!errors.fullName}
        helperText={errors.fullName}
        size="small"
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        size="small"
      />
      <TextField
        label="Mobile Number"
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
        error={!!errors.mobile}
        helperText={errors.mobile}
        size="small"
      />
      <TextField
        label="City"
        name="city"
        value={form.city}
        onChange={handleChange}
        error={!!errors.city}
        helperText={errors.city}
        size="small"
      />
      <Button variant="contained" color="primary" type="submit">Submit</Button>
    </Box>
  );
}

export default ContactForm; 