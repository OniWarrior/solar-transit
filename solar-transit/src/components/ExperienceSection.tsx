'use client';

import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SectionWrapper = styled(Box)({
  background: 'linear-gradient(to bottom, #000 0%, #08010f 40%, #0d0118 80%, #000 100%)',
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
  textTransform: 'uppercase',
  marginBottom: '80px',
});

const FeatureRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '64px',
  alignItems: 'center',
  marginBottom: '96px',
  '&:last-of-type': {
    marginBottom: 0,
  },
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '32px',
  },
});

const ImageWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 10',
  borderRadius: '4px',
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.06)',
  '& img': {
    transition: 'transform 0.7s ease',
  },
  '&:hover img': {
    transform: 'scale(1.04)',
  },
});

const ImageOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 60%)',
  zIndex: 1,
});

const TextBlock = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const FeatureNumber = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.65rem',
  fontWeight: 600,
  letterSpacing: '0.3em',
  color: '#c9a84c',
  textTransform: 'uppercase',
});

const FeatureTitle = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
  fontWeight: 700,
  letterSpacing: '0.06em',
  color: '#ffffff',
  lineHeight: 1.3,
});

const FeatureBody = styled(Typography)({
  fontFamily: '"Raleway", sans-serif',
  fontSize: '1rem',
  fontWeight: 300,
  lineHeight: 1.8,
  letterSpacing: '0.02em',
  color: 'rgba(255,255,255,0.55)',
});

const Divider = styled(Box)({
  width: '40px',
  height: '1px',
  background: 'linear-gradient(to right, #c9a84c, transparent)',
  margin: '4px 0',
});

const features = [
  {
    number: '01',
    title: 'Mercury Glory',
    body: 'Fly fantastically close to the Sun and witness Mercury\'s barren, cratered surface bathed in intense solar light. An experience found nowhere else in the solar system.',
    image: '/images/mercury_colony.png',
    alt: 'The surface of Mercury illuminated by the Sun',
  },
  {
    number: '02',
    title: 'Space Stations',
    body: 'Experience life aboard humanity\'s most advanced orbital outposts. Tour rotating habitats, observe Earth from above, and meet the crews who call deep space home.',
    image: '/images/venus_station.png',
    alt: 'A space station orbiting in deep space',
  },
  {
    number: '03',
    title: 'Mars Locality',
    body: 'Walk the red plains of Olympus Mons, explore the Valles Marineris canyon system, and meet new people, make new friends, and build memories that last a lifetime.',
    image: '/images/martian_colony.png',
    alt: 'The surface of Mars with astronauts exploring',
  },
];

function FeatureItem({ feature, index }: { feature: typeof features[0]; index: number }) {
  const rowRef = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <FeatureRow
      ref={rowRef}
      className="reveal"
      sx={{ transitionDelay: `${index * 0.1}s` }}
    >
      <ImageWrapper>
        <Image
          src={feature.image}
          alt={feature.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
        />
        <ImageOverlay />
      </ImageWrapper>

      <TextBlock>
        <FeatureNumber>{feature.number}</FeatureNumber>
        <Divider />
        <FeatureTitle>{feature.title}</FeatureTitle>
        <FeatureBody>{feature.body}</FeatureBody>
      </TextBlock>
    </FeatureRow>
  );
}

export default function ExperienceSection() {
  const headingRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <SectionWrapper>
      <SectionInner>
        <Box ref={headingRef} className="reveal">
          <SectionHeading>
            Here&apos;s what you&apos;ll experience<br />with Solar Transit
          </SectionHeading>
        </Box>

        {features.map((feature, i) => (
          <FeatureItem key={feature.number} feature={feature} index={i} />
        ))}
      </SectionInner>
    </SectionWrapper>
  );
}
