import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { fetchProjects, fetchClients, submitContact, subscribeNewsletter } from '../services/api';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import ClientCard from '../components/ClientCard';
import ContactForm from '../components/ContactForm';
import NewsletterForm from '../components/NewsletterForm';
import Footer from '../components/Footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contactMsg, setContactMsg] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  useEffect(() => {
    fetchProjects().then(setProjects);
    fetchClients().then(setClients);
  }, []);

  // Contact form submit handler
  const handleContactSubmit = async (form) => {
    setContactMsg('');
    try {
      await submitContact(form);
      setContactMsg('Thank you for contacting us!');
    } catch (err) {
      setContactMsg('Failed to submit. Please try again.');
    }
  };

  // Newsletter form submit handler
  const handleNewsletterSubmit = async (email) => {
    setNewsletterMsg('');
    try {
      await subscribeNewsletter(email);
      setNewsletterMsg('Subscribed successfully!');
    } catch (err) {
      setNewsletterMsg('Failed to subscribe. Please try again.');
    }
  };

  const adminLoginButton = (
    <Button component={RouterLink} to="/admin/login" color="primary" variant="outlined">
      Admin Login
    </Button>
  );

  // Scroll to projects section
  const handleExploreClick = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header rightContent={adminLoginButton} />
      <Box sx={{ pt: '64px' }}>
        {/* Hero Section */}
        <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', bgcolor: '#f8f9fa' }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: 32, md: 56 } }}>
            Building Trust Through Quality Projects
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', maxWidth: 700, mx: 'auto' }}>
            We deliver exceptional real estate solutions with transparency, reliability, and commitment to excellence.
          </Typography>
          <Button variant="contained" size="large" sx={{ px: 5, py: 1.5, fontWeight: 600, fontSize: 18, bgcolor: '#232a36', '&:hover': { bgcolor: '#1a202c' } }} onClick={handleExploreClick}>
            Explore Our Work
          </Button>
        </Box>

        {/* Projects Section */}
        <Box id="projects" sx={{ pt: 8, pb: 4 }}>
          <Container>
            <Typography variant="h4" gutterBottom align="center">Our Projects</Typography>
            <Typography variant="subtitle1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
              Discover our portfolio of successful real estate developments that showcase our commitment to quality and innovation.
            </Typography>
            {/* Carousel for Projects */}
            <Box sx={{ py: 2 }}>
              <Slider
                dots={true}
                infinite={projects.length > 3}
                speed={500}
                slidesToShow={Math.min(3, projects.length)}
                slidesToScroll={1}
                responsive={[{ breakpoint: 900, settings: { slidesToShow: 2 } }, { breakpoint: 600, settings: { slidesToShow: 1 } }]}
                style={{ maxWidth: 1200, margin: '0 auto' }}
              >
                {projects.map((p, i) => (
                  <Box key={i} px={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ProjectCard image={p.image} name={p.name} description={p.description} />
                  </Box>
                ))}
              </Slider>
            </Box>
          </Container>
        </Box>

        {/* Happy Clients Section */}
        <Box id="clients" sx={{ pt: 8, pb: 4, bgcolor: '#f8f9fa' }}>
          <Container>
            <Typography variant="h4" gutterBottom align="center">Happy Clients</Typography>
            <Typography variant="subtitle1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
              Hear what our satisfied clients have to say about their experience with Real Trust.
            </Typography>
            {/* Carousel for Clients */}
            <Box sx={{ py: 2 }}>
              <Slider
                dots={true}
                infinite={clients.length > 3}
                speed={500}
                slidesToShow={Math.min(3, clients.length)}
                slidesToScroll={1}
                responsive={[{ breakpoint: 900, settings: { slidesToShow: 2 } }, { breakpoint: 600, settings: { slidesToShow: 1 } }]}
                style={{ maxWidth: 1200, margin: '0 auto' }}
              >
                {clients.map((c, i) => (
                  <Box key={i} px={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ClientCard image={c.image} name={c.name} designation={c.designation} testimonial={c.description} />
                  </Box>
                ))}
              </Slider>
            </Box>
          </Container>
        </Box>

        {/* Contact & Newsletter Section */}
        <Box id="contact" sx={{ py: 8 }}>
          <Container>
            <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 900, mx: 'auto' }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>Get In Touch</Typography>
                <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                  Ready to start your next project? Contact us today and let's discuss how we can help you achieve your real estate goals.
                </Typography>
                <Paper elevation={2} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
                  <ContactForm onSubmit={handleContactSubmit} />
                  {contactMsg && <Alert severity={contactMsg.startsWith('Thank') ? 'success' : 'error'} sx={{ mt: 2 }}>{contactMsg}</Alert>}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>Stay Updated</Typography>
                <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                  Subscribe to our newsletter to receive the latest updates on our projects and industry insights.
                </Typography>
                <Paper elevation={1} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
                  <NewsletterForm onSubmit={handleNewsletterSubmit} />
                  {newsletterMsg && <Alert severity={newsletterMsg.startsWith('Subscribed') ? 'success' : 'error'} sx={{ mt: 2 }}>{newsletterMsg}</Alert>}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </>
  );
}

export default LandingPage; 