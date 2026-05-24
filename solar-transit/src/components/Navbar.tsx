'use client';

import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const StyledAppBar = styled(AppBar)<{ scrolled: boolean }>(({ scrolled }) => ({
  background: scrolled
    ? 'rgba(0, 0, 0, 0.85)'
    : 'transparent',
  backdropFilter: scrolled ? 'blur(12px)' : 'none',
  boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
  transition: 'background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
}));

const NavButton = styled(Button)({
  color: 'rgba(255,255,255,0.75)',
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.72rem',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  padding: '6px 16px',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: '#ffffff',
    background: 'transparent',
  },
});

const BookButton = styled(Button)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#000',
  background: 'linear-gradient(135deg, #e8d5a3, #c9a84c)',
  padding: '8px 22px',
  borderRadius: '2px',
  transition: 'opacity 0.2s ease, transform 0.2s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #e8d5a3, #c9a84c)',
    opacity: 0.88,
    transform: 'translateY(-1px)',
  },
});

const LogoMark = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  userSelect: 'none',
});

const LogoText = styled('span')({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '1rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  color: '#ffffff',
  textTransform: 'uppercase',
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledAppBar position="fixed" scrolled={scrolled}>
      <Toolbar sx={{ maxWidth: '1200px', width: '100%', mx: 'auto', px: { xs: 2, md: 4 }, py: 1 }}>
        {/* Logo */}
        <LogoMark sx={{ flexGrow: 1 }}>
          <RocketLaunchIcon sx={{ color: '#c9a84c', fontSize: 22 }} />
          <LogoText>Solar Transit</LogoText>
        </LogoMark>

        {/* Nav Links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NavButton href="#destinations">Destinations</NavButton>
          <NavButton href="/login">Login</NavButton>
          <BookButton href="/book">Book a Flight</BookButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
