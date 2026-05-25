'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, keyframes } from '@mui/material/styles';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// ── Twinkling star animation ───────────────────────────────────
const twinkle = keyframes`
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50%       { opacity: 1;    transform: scale(1.4); }
`;

// ── Layout ─────────────────────────────────────────────────────
const PageWrapper = styled(Box)({
  minHeight: '100vh',
  background: '#000',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflowX: 'hidden',
});

const StarfieldBg = styled(Box)({
  position: 'fixed',
  inset: 0,
  zIndex: 0,
  '& img': {
    objectFit: 'cover',
    objectPosition: 'center',
  },
});

// Radial vignette — darkens the outer edges like the circle in the mockup
const Vignette = styled(Box)({
  position: 'fixed',
  inset: 0,
  zIndex: 1,
  background: `
    radial-gradient(
      ellipse 70% 70% at 50% 50%,
      transparent 40%,
      rgba(0,0,0,0.6) 70%,
      rgba(0,0,0,0.92) 100%
    )
  `,
  pointerEvents: 'none',
});

const PageContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

// ── Page heading ───────────────────────────────────────────────
const PageHeading = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: '#ffffff',
  textAlign: 'center',
  textTransform: 'uppercase',
  textShadow: '0 0 40px rgba(201,168,76,0.3)',
  padding: '48px 24px 24px',
});

// ── Destination entry ──────────────────────────────────────────
const DestinationSection = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '80px 40px',
  '@media (max-width: 768px)': {
    padding: '60px 24px',
    minHeight: 'auto',
  },
});

const DestinationCard = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '48px',
  maxWidth: '1000px',
  width: '100%',
  background: 'rgba(0,0,0,0.01)',
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '40px',
  backdropFilter: 'blur(2px)',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '28px',
    padding: '28px',
  },
});

const PlanetImageWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  background: 'transparent',
  '& img': {
    transition: 'transform 0.8s ease',
  },
  '&:hover img': {
    transform: 'scale(1.04)',
  },
});

const TextBlock = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '20px',
});

const DestinationName = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: '#ffffff',
  textTransform: 'uppercase',
  textShadow: '0 0 30px rgba(255,255,255,0.2)',
});

const GoldDivider = styled(Box)({
  width: '48px',
  height: '1px',
  background: 'linear-gradient(to right, #c9a84c, transparent)',
});

const LoreText = styled(Typography)({
  fontFamily: '"Raleway", sans-serif',
  fontSize: '0.95rem',
  fontWeight: 300,
  lineHeight: 1.9,
  letterSpacing: '0.02em',
  color: 'rgba(255,255,255,0.65)',
});

const SectionDivider = styled(Box)({
  width: '80%',
  maxWidth: '600px',
  height: '1px',
  margin: '0 auto',
  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
});

// ── Twinkling stars overlay (canvas) ──────────────────────────
function TwinklingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate sparse twinkling stars
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random(),
      speed: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;

      stars.forEach((star) => {
        const opacity = 0.15 + 0.85 * Math.abs(Math.sin(star.phase + t * star.speed));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 230, ${opacity})`;
        ctx.shadowBlur = opacity > 0.7 ? 6 : 0;
        ctx.shadowColor = 'rgba(255,255,200,0.8)';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}

// ── Destination data ───────────────────────────────────────────
const destinations = [
  {
    name: 'Titan',
    image: '/images/Titan.png',
    alt: "Saturn's moon Titan",
    lore: "Saturn's largest moon. It was discovered in 2046 that there were microscopic organisms underneath the surface of its icy oceans. From that point, there was an expedition to colonize the moon. Eventually, the colony was established in 2055 and has slowly become a popular tourism location among Earthlings and Venusians — humans born and living in the upper atmosphere of Venus.",
  },
  {
    name: 'Europa',
    image: '/images/Europa.png',
    alt: "Jupiter's moon Europa",
    lore: "A beautiful moon of Jupiter and a popular tourist location due to its wonderful terraformed oceans. The salt in the ocean is removed via advanced desalination plants. One popular pastime among Europa lovers is to gaze up at Jupiter and make a wish. This moon is also celebrated for multiple scientific discoveries of extraterrestrial life that currently lives beneath the surface of the ocean.",
  },
  {
    name: 'Mars',
    image: '/images/Mars.png',
    alt: 'The red planet Mars',
    lore: "What can be said about the red planet that hasn't been said before? Elon Musk and SpaceX were the first to successfully establish a colony in an area known as Olympus Mons. After his passing, a statue commemorating Elon and his team was erected, and a special holiday was established by the Martian people. Mars is a major industrial center in the solar system, as a new element known as Martian Red Iron was discovered and is a key component in shielding ships from cosmic debris.",
  },
  {
    name: 'Lunar Gateway',
    image: '/images/Lunar_Gateway.png',
    alt: 'The Lunar Gateway space station',
    lore: "The Lunar Gateway is best described as a magnetic railgun that launches ships in the direction of their destination. It sits on a lunar base established by NASA in 2030. The railgun is vitally important because it removes the need for traditional rocket-based spacecraft to gain enough velocity for flight, conserving fuel from the momentum generated by the gun. The Gateway is an essential launch point for ships traveling throughout the solar system.",
  },
];

// ── Individual entry with scroll reveal ───────────────────────
function DestinationEntry({ dest, index }: { dest: typeof destinations[0]; index: number }) {
  const cardRef = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <DestinationSection>
      <Box ref={cardRef} className="reveal" sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <DestinationCard>
          {/* Planet image */}
          <PlanetImageWrapper>
            <Image
              src={dest.image}
              alt={dest.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </PlanetImageWrapper>

          {/* Text */}
          <TextBlock>
            <DestinationName>{dest.name}</DestinationName>
            <GoldDivider />
            <LoreText>{dest.lore}</LoreText>
          </TextBlock>
        </DestinationCard>
      </Box>
    </DestinationSection>
  );
}

// ── Page ───────────────────────────────────────────────────────
export default function DestinationsPage() {
  return (
    <PageWrapper>
      {/* Fixed starfield background */}
      <StarfieldBg>
        <Image
          src="/images/event_horizon.png"
          alt="Starfield background"
          fill
          priority
          style={{ objectFit: 'cover', opacity: '0.5' }}
        />
      </StarfieldBg>

      {/* Radial vignette */}
      <Vignette />

      {/* Twinkling stars canvas */}
      <TwinklingStars />

      <PageContent>
        <Navbar />

        <Box sx={{ pt: '64px' }}>
          <PageHeading>Destination Database</PageHeading>
        </Box>

        {destinations.map((dest, i) => (
          <Box key={dest.name}>
            <DestinationEntry dest={dest} index={i} />
            {i < destinations.length - 1 && <SectionDivider />}
          </Box>
        ))}

        <Footer />
      </PageContent>
    </PageWrapper>
  );
}
