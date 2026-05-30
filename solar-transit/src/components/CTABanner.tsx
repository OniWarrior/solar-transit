'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SectionWrapper = styled(Box)({
  background: 'linear-gradient(to bottom, #000 0%, #000e0c 40%, #001410 80%, #000 100%)',
  padding: '120px 24px',
  textAlign: 'center',
  overflow: 'hidden',
});

const Headline = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
  fontWeight: 700,
  letterSpacing: '0.06em',
  color: '#ffffff',
  textTransform: 'uppercase',
  lineHeight: 1.2,
  marginBottom: '16px',
});

const Subheadline = styled(Typography)({
  fontFamily: '"Raleway", sans-serif',
  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
  fontWeight: 300,
  letterSpacing: '0.08em',
  color: 'rgba(255,255,255,0.5)',
  marginBottom: '52px',
});

const GoldDivider = styled(Box)({
  width: '60px',
  height: '1px',
  background: 'linear-gradient(to right, transparent, #c9a84c, transparent)',
  margin: '0 auto 52px',
});

const CTAButton = styled(Button)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#000',
  background: 'linear-gradient(135deg, #e8d5a3, #c9a84c)',
  padding: '16px 48px',
  borderRadius: '2px',
  transition: 'opacity 0.2s ease, transform 0.2s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #e8d5a3, #c9a84c)',
    opacity: 0.85,
    transform: 'translateY(-2px)',
  },
});

export default function CTABanner() {
  const { data: session } = useSession();
  const [href, setHref] = useState('/login');

  useEffect(() => {
    if (session) setHref('/book');
    else setHref('/login');
  }, [session]);

  const contentRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <SectionWrapper>
      <Box ref={contentRef} className="reveal">
        <Headline>What are you waiting for?</Headline>
        <Subheadline>Book a flight today!</Subheadline>
        <GoldDivider />
        <CTAButton href={href} startIcon={<RocketLaunchIcon sx={{ fontSize: 16 }} />}>
          Explore Flights
        </CTAButton>
      </Box>
    </SectionWrapper>
  );
}
