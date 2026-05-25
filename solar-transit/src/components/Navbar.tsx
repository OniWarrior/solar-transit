'use client';

import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  background: 'transparent',
  backdropFilter: 'none',
  boxShadow: 'none',
  backgroundImage: 'none',
  transition: 'background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
  '&.scrolled': {
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 1px 0 rgba(255,255,255,0.06)',
  },
});

const NavLink = styled('a')({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.72rem',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.75)',
  textDecoration: 'none',
  padding: '6px 16px',
  transition: 'color 0.2s ease',
  '&:hover': { color: '#ffffff' },
});

const BookLink = styled('a')({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#000',
  textDecoration: 'none',
  background: 'linear-gradient(135deg, #e8d5a3, #c9a84c)',
  padding: '8px 22px',
  borderRadius: '2px',
  transition: 'opacity 0.2s ease, transform 0.2s ease',
  '&:hover': {
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

const DrawerInner = styled(Box)({
  width: '100vw',
  maxWidth: '320px',
  height: '100%',
  background: '#000',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
});

const DrawerHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '40px',
});

const DrawerNavLink = styled('a')({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.8rem',
  fontWeight: 400,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none',
  padding: '14px 0',
  width: '100%',
  display: 'block',
  transition: 'color 0.2s ease',
  '&:hover': { color: '#ffffff' },
});

const DrawerBookLink = styled('a')({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.78rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#000',
  textDecoration: 'none',
  background: 'linear-gradient(135deg, #e8d5a3, #c9a84c)',
  padding: '14px 0',
  borderRadius: '2px',
  width: '100%',
  marginTop: '24px',
  display: 'block',
  textAlign: 'center',
  transition: 'opacity 0.2s ease',
  '&:hover': { opacity: 0.88 },
});

const StyledDivider = styled(Divider)({
  borderColor: 'rgba(255,255,255,0.06)',
});

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const appBar = document.getElementById('solar-appbar');
      if (!appBar) return;
      if (window.scrollY > 40) {
        appBar.classList.add('scrolled');
      } else {
        appBar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <StyledAppBar id="solar-appbar" position="fixed">
        <Toolbar sx={{ maxWidth: '1200px', width: '100%', mx: 'auto', px: { xs: 2, md: 4 }, py: 1 }}>

          {/* Logo */}
          <LogoMark sx={{ flexGrow: 1 }}>
            <RocketLaunchIcon sx={{ color: '#c9a84c', fontSize: 22 }} />
            <LogoText>Solar Transit</LogoText>
          </LogoMark>

          {/* Desktop nav — hidden below 600px */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
            <NavLink href="#destinations">Destinations</NavLink>
            <NavLink href="/login">Login</NavLink>
            <NavLink href='/register'>Register</NavLink>
            <BookLink href="/book">Book a Flight</BookLink>
          </Box>

          {/* Hamburger — visible below 600px */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'flex', sm: 'none' }, color: '#fff' }}
            aria-label="Open navigation menu"
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerInner role="navigation" aria-label="Mobile navigation">

          <DrawerHeader>
            <LogoMark>
              <RocketLaunchIcon sx={{ color: '#c9a84c', fontSize: 20 }} />
              <LogoText sx={{ fontSize: '0.85rem' }}>Solar Transit</LogoText>
            </LogoMark>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              sx={{ color: 'rgba(255,255,255,0.6)' }}
              aria-label="Close navigation menu"
            >
              <CloseIcon />
            </IconButton>
          </DrawerHeader>

          <StyledDivider />
          <DrawerNavLink href="#destinations" onClick={() => setDrawerOpen(false)}>
            Destinations
          </DrawerNavLink>
          <StyledDivider />
          <DrawerNavLink href="/login" onClick={() => setDrawerOpen(false)}>
            Login
          </DrawerNavLink>
          <StyledDivider />

          <DrawerBookLink href="/book" onClick={() => setDrawerOpen(false)}>
            Book a Flight
          </DrawerBookLink>

        </DrawerInner>
      </Drawer>
    </>
  );
}
