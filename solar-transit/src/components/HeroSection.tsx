'use client';

import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled, keyframes } from '@mui/material/styles';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ExploreIcon from '@mui/icons-material/Explore';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50%       { transform: translateY(8px); opacity: 1; }
`;

const HeroWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  background: '#000',
});

const HeroImage = styled(Box)({
  position: 'absolute',
  inset: 0,
  backgroundImage: 'url(/images/Hero_Banner_Landing.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
  opacity: 0.55,
  animation: `${fadeIn} 1.2s ease forwards`,
});

const HeroOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 80%, #000 100%)',
});

const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  maxWidth: '820px',
  padding: '0 24px',
});

const Eyebrow = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.7rem',
  fontWeight: 400,
  letterSpacing: '0.3em',
  color: '#c9a84c',
  textTransform: 'uppercase',
  marginBottom: '20px',
  animation: `${fadeUp} 0.8s ease 0.2s both`,
});

const Headline = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
  fontWeight: 700,
  letterSpacing: '0.04em',
  lineHeight: 1.15,
  color: '#ffffff',
  textShadow: '0 2px 40px rgba(0,0,0,0.8)',
  marginBottom: '20px',
  animation: `${fadeUp} 0.8s ease 0.4s both`,
});

const Subheadline = styled(Typography)({
  fontFamily: '"Raleway", sans-serif',
  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
  fontWeight: 300,
  letterSpacing: '0.06em',
  color: 'rgba(255,255,255,0.7)',
  marginBottom: '48px',
  animation: `${fadeUp} 0.8s ease 0.6s both`,
});

const CTAGroup = styled(Box)({
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  animation: `${fadeUp} 0.8s ease 0.8s both`,
});

const PrimaryButton = styled(Button)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#000',
  background: 'linear-gradient(135deg, #e8d5a3, #c9a84c)',
  padding: '14px 32px',
  borderRadius: '2px',
  '&:hover': {
    background: 'linear-gradient(135deg, #e8d5a3, #c9a84c)',
    opacity: 0.88,
    transform: 'translateY(-2px)',
  },
  transition: 'opacity 0.2s ease, transform 0.2s ease',
});

const SecondaryButton = styled(Button)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.72rem',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.85)',
  border: '1px solid rgba(255,255,255,0.25)',
  padding: '14px 32px',
  borderRadius: '2px',
  '&:hover': {
    border: '1px solid rgba(255,255,255,0.6)',
    background: 'rgba(255,255,255,0.05)',
  },
  transition: 'all 0.2s ease',
});

const ScrollArrow = styled(Box)({
  position: 'absolute',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 2,
  animation: `${pulse} 2s ease-in-out infinite`,
  cursor: 'pointer',
});

export default function HeroSection() {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <HeroWrapper>
      <HeroImage />
      <HeroOverlay />

      <HeroContent>
        <Eyebrow>The Future of Human Travel</Eyebrow>
        <Headline>
          Commercial Spaceflight<br />Begins Here
        </Headline>
        <Subheadline>
          Reserve civilian journeys across the solar system
        </Subheadline>
        <CTAGroup>
          <PrimaryButton startIcon={<ExploreIcon />} href="#destinations">
            Explore Destinations
          </PrimaryButton>
          <SecondaryButton startIcon={<RocketLaunchIcon />} href="/book">
            Book a Flight
          </SecondaryButton>
        </CTAGroup>
      </HeroContent>

      <ScrollArrow onClick={scrollToNext}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </ScrollArrow>
    </HeroWrapper>
  );
}
