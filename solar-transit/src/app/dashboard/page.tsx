'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, keyframes } from '@mui/material/styles';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// ── Types ──────────────────────────────────────────────────────
interface BookedFlight {
  id: string;
  ticketCount: number;
  status: string;
  createdAt: string;
  flight: {
    flightNumber: string;
    planet: string;
    fromLocation: string;
    toLocation: string;
    departure: string;
    arrival: string;
    duration: string;
  };
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

const PageContent = styled(Box)({
  flex: 1,
  background: 'linear-gradient(to bottom, #000 0%, #08010f 30%, #0d0118 60%, #080010 85%, #000 100%)',
  paddingBottom: '80px',
});

const PageHeading = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: '#ffffff',
  textTransform: 'uppercase',
  textAlign: 'center',
  padding: '60px 24px 8px',
});

const SubHeading = styled(Typography)({
  fontFamily: '"Raleway", sans-serif',
  fontSize: '0.85rem',
  fontWeight: 300,
  letterSpacing: '0.06em',
  color: 'rgba(255,255,255,0.35)',
  textAlign: 'center',
  marginBottom: '40px',
});

const GoldDivider = styled(Box)({
  width: '60px',
  height: '1px',
  background: 'linear-gradient(to right, transparent, #c9a84c, transparent)',
  margin: '0 auto 40px',
});

const FilterRow = styled(Box)({
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  padding: '0 24px 24px',
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

const FilterLabel = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.65rem',
  letterSpacing: '0.2em',
  color: 'rgba(255,255,255,0.3)',
  textTransform: 'uppercase',
  textAlign: 'center',
  marginBottom: '20px',
});

const BookingList = styled(Box)({
  maxWidth: '860px',
  width: '100%',
  margin: '0 auto',
  padding: '0 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const BookingCard = styled(Box)({
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '3px',
  padding: '20px 28px',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  gap: '16px',
  animation: `${fadeUp} 0.4s ease both`,
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

const RightBlock = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '8px',
  '@media (max-width: 600px)': { alignItems: 'flex-start' },
});

const TicketBadge = styled(Box)({
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

const StatusBadge = styled(Box)<{ status: string }>(({ status }) => ({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.58rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  padding: '4px 10px',
  borderRadius: '2px',
  color: status === 'confirmed' ? '#4caf50' : 'rgba(255,255,255,0.4)',
  border: `1px solid ${status === 'confirmed' ? 'rgba(76,175,80,0.35)' : 'rgba(255,255,255,0.15)'}`,
  background: status === 'confirmed' ? 'rgba(76,175,80,0.08)' : 'transparent',
}));

const EmptyState = styled(Box)({
  textAlign: 'center',
  padding: '64px 24px',
});

const EmptyIcon = styled(Box)({
  marginBottom: '20px',
  opacity: 0.25,
});

const EmptyText = styled(Typography)({
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '0.8rem',
  letterSpacing: '0.15em',
  color: 'rgba(255,255,255,0.35)',
  textTransform: 'uppercase',
  marginBottom: '8px',
});

const EmptySubText = styled(Typography)({
  fontFamily: '"Raleway", sans-serif',
  fontSize: '0.85rem',
  fontWeight: 300,
  color: 'rgba(255,255,255,0.2)',
  '& a': {
    color: '#c9a84c',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  },
});

// ── Component ──────────────────────────────────────────────────
export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<BookedFlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch bookings
  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/bookings');
        const data = await res.json();
        setBookings(data.bookings ?? []);
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [status]);

  const handleFilterClick = (name: string) => {
    setActiveFilter((prev) => (prev === name ? null : name));
  };

  const visibleBookings = activeFilter
    ? bookings.filter((b) => b.flight.planet === activeFilter)
    : bookings;

  const bookedPlanets = [...new Set(bookings.map((b) => b.flight.planet))];

  if (status === 'loading') {
    return (
      <PageWrapper>
        <Navbar />
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress sx={{ color: '#c9a84c' }} />
        </Box>
        <Footer />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Navbar />

      <PageContent sx={{ pt: '64px' }}>
        {/* Header */}
        <PageHeading>Booked Flights</PageHeading>
        <SubHeading>
          {session?.user?.email}
        </SubHeading>
        <GoldDivider />

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

        {/* Filter label */}
        <FilterLabel>
          {activeFilter
            ? `Showing bookings for ${activeFilter}`
            : 'Showing all bookings'}
        </FilterLabel>

        {/* Booking cards */}
        <BookingList>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress sx={{ color: '#c9a84c' }} />
            </Box>

          ) : visibleBookings.length === 0 && bookings.length === 0 ? (
            // No bookings at all
            <EmptyState>
              <EmptyIcon>
                <RocketLaunchIcon sx={{ fontSize: 56, color: '#fff' }} />
              </EmptyIcon>
              <EmptyText>No flights booked yet</EmptyText>
              <EmptySubText>
                <a href="/book">Browse available flights</a> and book your first journey.
              </EmptySubText>
            </EmptyState>

          ) : visibleBookings.length === 0 && activeFilter ? (
            // Filter active but no bookings for that planet
            <EmptyState>
              <EmptyIcon>
                <RocketLaunchIcon sx={{ fontSize: 56, color: '#fff' }} />
              </EmptyIcon>
              <EmptyText>0 booked flights for {activeFilter}</EmptyText>
              <EmptySubText>
                You have bookings for{' '}
                {bookedPlanets.map((p, i) => (
                  <span key={p}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveFilter(p); }}>
                      {p}
                    </a>
                    {i < bookedPlanets.length - 1 ? ', ' : ''}
                  </span>
                ))}.
              </EmptySubText>
            </EmptyState>

          ) : (
            visibleBookings.map((booking, i) => (
              <BookingCard
                key={booking.id}
                sx={{ animationDelay: `${i * 0.06}s` }}
              >
                <Box>
                  <FlightId>{booking.flight.flightNumber}</FlightId>
                  <RouteText>{booking.flight.fromLocation}</RouteText>
                  <RouteText sx={{ color: '#c9a84c', mb: '8px' }}>
                    → {booking.flight.toLocation}
                  </RouteText>
                  <MetaText>
                    Departs: {booking.flight.departure} &nbsp;·&nbsp; Arrives: {booking.flight.arrival}
                  </MetaText>
                  <MetaText sx={{ mt: '4px' }}>
                    Booked: {new Date(booking.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </MetaText>
                </Box>

                <RightBlock>
                  <TicketBadge>
                    {booking.ticketCount} {booking.ticketCount === 1 ? 'ticket' : 'tickets'}
                  </TicketBadge>
                  <StatusBadge status={booking.status}>
                    {booking.status}
                  </StatusBadge>
                </RightBlock>
              </BookingCard>
            ))
          )}
        </BookingList>
      </PageContent>

      <Footer />
    </PageWrapper>
  );
}
