'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const FooterWrapper = styled(Box)({
  background: '#000',
  borderTop: '1px solid rgba(255,255,255,0.06)',
  padding: '60px 24px 36px',
});

const FooterInner = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
});

const FooterTop = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '48px',
  marginBottom: '60px',
});

const FooterLogo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '16px',
});

const FooterLogoText = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.95rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  color: '#ffffff',
  textTransform: 'uppercase',
});

const FooterTagline = styled(Typography)({
  fontFamily: '"Raleway", sans-serif',
  fontSize: '0.85rem',
  fontWeight: 300,
  letterSpacing: '0.04em',
  color: 'rgba(255,255,255,0.4)',
  lineHeight: 1.7,
  maxWidth: '240px',
});

const FooterHeading = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.65rem',
  fontWeight: 600,
  letterSpacing: '0.2em',
  color: '#c9a84c',
  textTransform: 'uppercase',
  marginBottom: '18px',
});

const FooterLink = styled('a')({
  display: 'block',
  fontFamily: '"Raleway", sans-serif',
  fontSize: '0.88rem',
  fontWeight: 300,
  color: 'rgba(255,255,255,0.5)',
  textDecoration: 'none',
  marginBottom: '10px',
  letterSpacing: '0.03em',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: 'rgba(255,255,255,0.9)',
  },
});

const Divider = styled(Box)({
  height: '1px',
  background: 'rgba(255,255,255,0.06)',
  marginBottom: '28px',
});

const FooterBottom = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
});

const FooterCopy = styled(Typography)({
  fontFamily: '"Raleway", sans-serif',
  fontSize: '0.78rem',
  fontWeight: 300,
  color: 'rgba(255,255,255,0.25)',
  letterSpacing: '0.04em',
});

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>
        <FooterTop>
          {/* Brand */}
          <Box>
            <FooterLogo>
              <RocketLaunchIcon sx={{ color: '#c9a84c', fontSize: 20 }} />
              <FooterLogoText>Solar Transit</FooterLogoText>
            </FooterLogo>
            <FooterTagline>
              Humanity&apos;s first civilian spaceflight booking platform. Explore the solar system.
            </FooterTagline>
          </Box>

          {/* Destinations */}
          <Box>
            <FooterHeading>Destinations</FooterHeading>
            <FooterLink href="#">Mars Colony</FooterLink>
            <FooterLink href="#">Europa Station</FooterLink>
            <FooterLink href="#">Titan Outpost</FooterLink>
            <FooterLink href="#">Lunar Gateway</FooterLink>
            <FooterLink href="#">All Destinations</FooterLink>
          </Box>

          {/* Company */}
          <Box>
            <FooterHeading>Company</FooterHeading>
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Safety Standards</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Press</FooterLink>
          </Box>

          {/* Support */}
          <Box>
            <FooterHeading>Support</FooterHeading>
            <FooterLink href="#">Help Center</FooterLink>
            <FooterLink href="#">Manage Booking</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
          </Box>
        </FooterTop>

        <Divider />

        <FooterBottom>
          <FooterCopy>
            © {new Date().getFullYear()} Solar Transit. All rights reserved.
          </FooterCopy>
          <FooterCopy>
            Built with Next.js · Powered by imagination
          </FooterCopy>
        </FooterBottom>
      </FooterInner>
    </FooterWrapper>
  );
}
