'use client';

import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, keyframes } from '@mui/material/styles';
import { useScrollReveal } from '../hooks/useScrollReveal';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const SectionWrapper = styled(Box)({
  background: 'linear-gradient(to bottom, #000 0%, #010a18 40%, #020d20 80%, #000 100%)',
  padding: '100px 24px',
  overflow: 'hidden',
});

const SectionInner = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
});

const SectionHeading = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: '#ffffff',
  textAlign: 'center',
  marginBottom: '64px',
  textTransform: 'uppercase',
});

const CardGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '24px',
  '@media (max-width: 900px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
  },
});

const DestinationCard = styled(Box)({
  position: 'relative',
  borderRadius: '4px',
  overflow: 'hidden',
  cursor: 'default',
  border: '1px solid rgba(255,255,255,0.06)',
  transition: 'transform 0.4s ease, border-color 0.4s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    borderColor: 'rgba(201, 168, 76, 0.35)',
  },
  '&:hover .card-overlay': {
    opacity: 1,
  },
  '&:hover .card-label': {
    color: '#c9a84c',
  },
});

const ImageWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  '& img': {
    transition: 'transform 0.6s ease',
  },
  '&:hover img': {
    transform: 'scale(1.06)',
  },
});

const CardOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
  opacity: 0.6,
  transition: 'opacity 0.4s ease',
  zIndex: 1,
});

const CardLabel = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.85)',
  textAlign: 'center',
  padding: '16px 12px 14px',
  background: '#050a10',
  transition: 'color 0.3s ease',
});

const destinations = [
  { name: 'Mars', image: '/images/Mars.png', alt: 'The red planet Mars' },
  { name: 'Europa', image: '/images/Europa.png', alt: 'Jupiter\'s moon Europa' },
  { name: 'Titan', image: '/images/Titan.png', alt: 'Saturn\'s moon Titan' },
  { name: 'Lunar Gateway', image: '/images/Lunar_Gateway.png', alt: 'Lunar Gateway space station' },
];

export default function DestinationsSection() {
  const headingRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const gridRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  return (
    <SectionWrapper id="destinations">
      <SectionInner>
        <Box ref={headingRef} className="reveal">
          <SectionHeading>Possible Destinations</SectionHeading>
        </Box>

        <CardGrid ref={gridRef} className="reveal">
          {destinations.map((dest, i) => (
            <DestinationCard
              key={dest.name}
              sx={{ animationDelay: `${i * 0.1}s` }}
            >
              <ImageWrapper>
                <Image
                  src={dest.image}
                  alt={dest.alt}
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
                <CardOverlay className="card-overlay" />
              </ImageWrapper>
              <CardLabel className="card-label">{dest.name}</CardLabel>
            </DestinationCard>
          ))}
        </CardGrid>
      </SectionInner>
    </SectionWrapper>
  );
}
