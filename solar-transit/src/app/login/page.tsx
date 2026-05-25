'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// ── Layout ────────────────────────────────────────────────────
const PageWrapper = styled(Box)({
  minHeight: '100vh',
  background: '#000',
  display: 'flex',
  flexDirection: 'column',
});

const ContentRow = styled(Box)({
  flex: 1,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
});

const ImagePanel = styled(Box)({
  position: 'relative',
  minHeight: '340px',
  overflow: 'hidden',
  '@media (max-width: 768px)': {
    height: '280px',
  },
});

const ImageOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
  zIndex: 1,
});

const FormPanel = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '64px 48px',
  background: '#000',
  '@media (max-width: 480px)': {
    padding: '40px 24px',
  },
});

// ── Form elements ─────────────────────────────────────────────
const FormHeading = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '1.4rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: '#ffffff',
  textTransform: 'uppercase',
  marginBottom: '40px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '24px',
  '& .MuiInput-root': {
    color: '#fff',
    fontFamily: '"Raleway", sans-serif',
    fontSize: '0.9rem',
    '&:before': {
      borderBottomColor: 'rgba(255,255,255,0.2)',
    },
    '&:hover:before': {
      borderBottomColor: 'rgba(255,255,255,0.5)',
    },
    '&:after': {
      borderBottomColor: '#c9a84c',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.4)',
    fontFamily: '"Raleway", sans-serif',
    fontSize: '0.85rem',
    letterSpacing: '0.06em',
    '&.Mui-focused': {
      color: '#c9a84c',
    },
  },
});

const SubmitLink = styled('a')({
  display: 'inline-block',
  marginTop: '16px',
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#000',
  textDecoration: 'none',
  background: 'linear-gradient(135deg, #e8d5a3, #c9a84c)',
  padding: '14px 36px',
  borderRadius: '999px',
  cursor: 'pointer',
  border: 'none',
  transition: 'opacity 0.2s ease, transform 0.2s ease',
  '&:hover': {
    opacity: 0.88,
    transform: 'translateY(-1px)',
  },
});

const FooterText = styled(Typography)({
  fontFamily: '"Raleway", sans-serif',
  fontSize: '0.82rem',
  fontWeight: 300,
  color: 'rgba(255,255,255,0.4)',
  marginTop: '28px',
  '& a': {
    color: '#c9a84c',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  },
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <ContentRow sx={{ pt: '64px' }}>

        {/* Left — image panel */}
        <ImagePanel>
          <Image
            src="/images/login_asset.png"
            alt="Space launch facility"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <ImageOverlay />
        </ImagePanel>

        {/* Right — form panel */}
        <FormPanel>
          <FormHeading>Login</FormHeading>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3, background: 'rgba(211,47,47,0.15)', color: '#ff6b6b', border: '1px solid rgba(211,47,47,0.3)' }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <StyledTextField
              label="email"
              type="email"
              variant="standard"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledTextField
              label="password"
              type="password"
              variant="standard"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <SubmitLink
              as="button"
              type="submit"
              style={{ opacity: loading ? 0.6 : 1, pointerEvents: loading ? 'none' : 'auto' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </SubmitLink>
          </Box>

          <FooterText>
            Don&apos;t have an account?{' '}
            <a href="/register">Register here</a>
          </FooterText>
        </FormPanel>

      </ContentRow>
      <Footer />
    </PageWrapper>
  );
}
