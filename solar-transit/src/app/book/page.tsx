'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { styled, keyframes } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// ── Types ──────────────────────────────────────────────────────
interface Flight {
  id: string;
  flightNumber: string;
  planet: string;
  fromLocation: string;
  toLocation: string;
  departure: string;
  arrival: string;
  duration: string;
}

// ── Planet filter data ─────────────────────────────────────────
const planets = [
  { name: 'Mars', image: '/images/Mars.png' },
  { name: 'Europa', image: '/images/Europa.png' },
  { name: 'Titan', image: '/images/Titan.png' },
  { name: 'Lunar Gateway', image: '/images/Lunar_Gateway.png' },
];

// ── Animations ─────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Styled components ──────────────────────────────────────────
const PageWrapper = styled(Box)({
  minHeight: '100vh',
  background: '#000',
  display: 'flex',
  flexDirection: 'column',
});

const HeroWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '480px',
  overflow: 'hidden',
  '@media (max-width: 600px)': { height: '320px' },
});

const HeroOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 70%, #000 100%)',
  zIndex: 1,
});

const HeroTitle = styled(Typography)({
  position: 'absolute',
  bottom: '60px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 2,
  fontFamily: '"Orbitron", sans-serif',
  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: '#fff',
  textTransform: 'uppercase',
  textShadow: '0 2px 30px rgba(0,0,0,0.8)',
  whiteSpace: 'nowrap',
});

const ScrollChevron = styled(Box)({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 2,
  opacity: 0.6,
  cursor: 'pointer',
});

const FilterRow = styled(Box)({
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  padding: '32px 24px 24px',
});

const PlanetFilterBtn = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active }) => ({
  position: 'relative',
  width: '100px',
  height: '80px',
  borderRadius: '4px',
  overflow: 'hidden',
  cursor: 'pointer',
  border: active ? '2px solid #c9a84c' : '2px solid rgba(255,255,255,0.12)',
  transition: 'border-color 0.25s ease, transform 0.25s ease',
  flexShrink: 0,
  '&:hover': {
    borderColor: active ? '#c9a84c' : 'rgba(255,255,255,0.4)',
    transform: 'translateY(-2px)',
  },
  '@media (max-width: 480px)': { width: '72px', height: '60px' },
}));

const PlanetLabel = styled(Typography)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 2,
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.58rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#fff',
  textAlign: 'center',
  padding: '4px 2px',
  background: 'rgba(0,0,0,0.6)',
});

const FilterOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  background: 'rgba(0,0,0,0.25)',
});

const FlightList = styled(Box)({
  maxWidth: '860px',
  width: '100%',
  margin: '0 auto',
  padding: '8px 24px 60px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const FlightCard = styled(Box)({
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '3px',
  padding: '20px 28px',
  cursor: 'pointer',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  gap: '16px',
  transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
  animation: `${fadeUp} 0.4s ease both`,
  '&:hover': {
    background: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(201,168,76,0.4)',
    transform: 'translateY(-2px)',
  },
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
    padding: '16px 20px',
  },
});

const FlightId = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.62rem',
  fontWeight: 600,
  letterSpacing: '0.2em',
  color: '#c9a84c',
  textTransform: 'uppercase',
  marginBottom: '8px',
});

const RouteText = styled(Typography)({
  fontFamily: '"Raleway", sans-serif',
  fontSize: '0.92rem',
  fontWeight: 500,
  color: '#fff',
  letterSpacing: '0.02em',
  marginBottom: '4px',
});

const MetaText = styled(Typography)({
  fontFamily: '"Raleway", sans-serif',
  fontSize: '0.78rem',
  fontWeight: 300,
  color: 'rgba(255,255,255,0.45)',
  letterSpacing: '0.04em',
});

const DurationBadge = styled(Box)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.65rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  color: '#c9a84c',
  border: '1px solid rgba(201,168,76,0.35)',
  borderRadius: '2px',
  padding: '6px 12px',
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
});

const ModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '420px',
  background: 'rgba(10,10,18,0.92)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '4px',
  padding: '40px 36px',
  outline: 'none',
});

const ModalTitle = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '1rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: '#fff',
  textAlign: 'center',
  textTransform: 'uppercase',
  marginBottom: '32px',
  lineHeight: 1.5,
});

const TicketCount = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '2rem',
  fontWeight: 700,
  color: '#c9a84c',
  textAlign: 'center',
  marginBottom: '16px',
});

const CounterRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '32px',
});

const CounterBtn = styled(IconButton)({
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  transition: 'border-color 0.2s ease',
  '&:hover': { borderColor: '#c9a84c', color: '#c9a84c' },
  '&:disabled': { opacity: 0.3 },
});

const BookBtn = styled('button')({
  display: 'block',
  width: '100%',
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.78rem',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#000',
  background: 'linear-gradient(135deg, #e8d5a3, #c9a84c)',
  padding: '14px 0',
  borderRadius: '999px',
  textAlign: 'center',
  cursor: 'pointer',
  border: 'none',
  transition: 'opacity 0.2s ease',
  '&:hover': { opacity: 0.88 },
  '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
});

// ── Component ──────────────────────────────────────────────────
export default function BookFlightPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bookingMessage, setBookingMessage] = useState('');

  // Fetch flights from API
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const url = activeFilter
          ? `/api/flights?planet=${encodeURIComponent(activeFilter)}`
          : '/api/flights';
        const res = await fetch(url);
        const data = await res.json();
        setFlights(data.flights ?? []);
      } catch {
        setFlights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [activeFilter]);

  const handleFilterClick = (name: string) => {
    setActiveFilter((prev) => (prev === name ? null : name));
  };

  const handleFlightClick = (flight: Flight) => {
    setSelectedFlight(flight);
    setTicketCount(1);
    setBookingStatus('idle');
    setBookingMessage('');
  };

  const handleClose = () => {
    if (bookingStatus === 'loading') return;
    setSelectedFlight(null);
    setBookingStatus('idle');
  };

  const handleBookFlight = async () => {
    if (!selectedFlight) return;
    setBookingStatus('loading');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flightId: selectedFlight.id,
          ticketCount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setBookingStatus('error');
        setBookingMessage(data.message || 'Booking failed. Please try again.');
      } else {
        setBookingStatus('success');
        setBookingMessage(`Booking confirmed! Flight ${selectedFlight.flightNumber} — ${ticketCount} ticket${ticketCount > 1 ? 's' : ''}.`);
      }
    } catch {
      setBookingStatus('error');
      setBookingMessage('Something went wrong. Please try again.');
    }
  };

  const scrollToFlights = () => {
    document.getElementById('flights-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageWrapper>
      <Navbar />

      {/* Hero */}
      <HeroWrapper sx={{ mt: '64px' }}>
        <Image
          src="/images/travelers_waving.png"
          alt="Astronauts preparing for launch"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
        <HeroOverlay />
        <HeroTitle>Book A Flight</HeroTitle>
        <ScrollChevron onClick={scrollToFlights}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </ScrollChevron>
      </HeroWrapper>

      {/* Filter + Flights */}
      <Box id="flights-section" sx={{ flex: 1, background: 'linear-gradient(to bottom, #000 0%, #08010f 30%, #0d0118 60%, #080010 85%, #000 100%)' }}>

        {/* Planet filter buttons */}
        <FilterRow>
          {planets.map((planet) => (
            <PlanetFilterBtn
              key={planet.name}
              active={activeFilter === planet.name}
              onClick={() => handleFilterClick(planet.name)}
            >
              <Image
                src={planet.image}
                alt={planet.name}
                fill
                sizes="100px"
                style={{ objectFit: 'cover' }}
              />
              <FilterOverlay />
              <PlanetLabel>{planet.name}</PlanetLabel>
            </PlanetFilterBtn>
          ))}
        </FilterRow>

        {/* Active filter label */}
        <Typography sx={{
          fontFamily: '"Orbitron", sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          textAlign: 'center',
          mb: '16px',
        }}>
          {activeFilter ? `Showing flights to ${activeFilter}` : 'Showing all available flights'}
        </Typography>

        {/* Flight cards */}
        <FlightList>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress sx={{ color: '#c9a84c' }} />
            </Box>
          ) : flights.length === 0 ? (
            <Typography sx={{ fontFamily: '"Raleway", sans-serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center', padding: '48px 0' }}>
              No flights available for this destination.
            </Typography>
          ) : (
            flights.map((flight, i) => (
              <FlightCard
                key={flight.id}
                onClick={() => handleFlightClick(flight)}
                sx={{ animationDelay: `${i * 0.06}s` }}
              >
                <Box>
                  <FlightId>{flight.flightNumber}</FlightId>
                  <RouteText>{flight.fromLocation}</RouteText>
                  <RouteText sx={{ color: '#c9a84c', mb: '8px' }}>
                    → {flight.toLocation}
                  </RouteText>
                  <MetaText>
                    Departs: {flight.departure} &nbsp;·&nbsp; Arrives: {flight.arrival}
                  </MetaText>
                </Box>
                <DurationBadge>{flight.duration}</DurationBadge>
              </FlightCard>
            ))
          )}
        </FlightList>
      </Box>

      <Footer />

      {/* Booking Modal */}
      <Modal
        open={!!selectedFlight}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            style: { backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.6)' },
          },
        }}
      >
        <ModalBox>
          {/* Close */}
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ position: 'absolute', top: 12, right: 12, color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#fff' } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {selectedFlight && (
            <>
              <Typography sx={{
                fontFamily: '"Orbitron", sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: '#c9a84c',
                textAlign: 'center',
                mb: '8px',
                textTransform: 'uppercase',
              }}>
                {selectedFlight.flightNumber} · {selectedFlight.planet}
              </Typography>

              {/* Success state */}
              {bookingStatus === 'success' ? (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <CheckCircleOutlineIcon sx={{ color: '#c9a84c', fontSize: 48, mb: 2 }} />
                  <Typography sx={{
                    fontFamily: '"Raleway", sans-serif',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.7,
                  }}>
                    {bookingMessage}
                  </Typography>
                </Box>
              ) : (
                <>
                  <ModalTitle>
                    How many tickets<br />do you wish to purchase?
                  </ModalTitle>

                  {bookingStatus === 'error' && (
                    <Alert severity="error" sx={{ mb: 2, background: 'rgba(211,47,47,0.15)', color: '#ff6b6b', border: '1px solid rgba(211,47,47,0.3)' }}>
                      {bookingMessage}
                    </Alert>
                  )}

                  <TicketCount>{ticketCount}</TicketCount>

                  <CounterRow>
                    <CounterBtn
                      onClick={() => setTicketCount((n) => Math.max(1, n - 1))}
                      disabled={ticketCount <= 1 || bookingStatus === 'loading'}
                    >
                      <RemoveIcon fontSize="small" />
                    </CounterBtn>

                    <Slider
                      value={ticketCount}
                      min={1}
                      max={10}
                      step={1}
                      onChange={(_, val) => setTicketCount(val as number)}
                      disabled={bookingStatus === 'loading'}
                      sx={{
                        flex: 1,
                        color: '#c9a84c',
                        '& .MuiSlider-thumb': {
                          background: '#c9a84c',
                          '&:hover': { boxShadow: '0 0 0 8px rgba(201,168,76,0.16)' },
                        },
                        '& .MuiSlider-track': { background: '#c9a84c', border: 'none' },
                        '& .MuiSlider-rail': { background: 'rgba(255,255,255,0.15)' },
                      }}
                    />

                    <CounterBtn
                      onClick={() => setTicketCount((n) => Math.min(10, n + 1))}
                      disabled={ticketCount >= 10 || bookingStatus === 'loading'}
                    >
                      <AddIcon fontSize="small" />
                    </CounterBtn>
                  </CounterRow>

                  <BookBtn
                    onClick={handleBookFlight}
                    disabled={bookingStatus === 'loading'}
                  >
                    {bookingStatus === 'loading' ? 'Booking...' : 'Book Flight'}
                  </BookBtn>
                </>
              )}
            </>
          )}
        </ModalBox>
      </Modal>
    </PageWrapper>
  );
}
