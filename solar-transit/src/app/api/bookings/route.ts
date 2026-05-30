import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';
import { prisma } from '../../../lib/prisma';
import { bookingSchema } from '../../../lib/validationSchemas';
import { rateLimit } from '../../../lib/rateLimit';

// ── GET /api/bookings ──────────────────────────────────────────
// Returns all bookings for the currently logged in user.
export async function GET(req: NextRequest) {
  try {
    // 1. Verify session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    // 2. Fetch only this user's bookings
    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      include: {
        flight: {
          select: {
            flightNumber: true,
            planet: true,
            fromLocation: true,
            toLocation: true,
            departure: true,
            arrival: true,
            duration: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookings }, { status: 200 });

  } catch (error) {
    console.error('[GET /api/bookings]', error);
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// ── POST /api/bookings ─────────────────────────────────────────
// Creates a new booking for the currently logged in user.
export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting — max 10 booking attempts per 15 minutes per IP
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    const allowed = rateLimit(ip, { maxRequests: 10, windowMs: 15 * 60 * 1000 });
    if (!allowed) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Verify session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    // 3. Parse and validate request body
    const body = await req.json();
    const result = bookingSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.flatten().fieldErrors;
      const message = Object.values(firstError)[0]?.[0] ?? 'Invalid request data.';
      return NextResponse.json(
        { message },
        { status: 400 }
      );
    }

    const { flightId, ticketCount } = result.data;

    // 4. Verify the flight exists
    const flight = await prisma.flight.findUnique({
      where: { id: flightId },
    });
    if (!flight) {
      return NextResponse.json(
        { message: 'Flight not found.' },
        { status: 404 }
      );
    }

    // 5. Create the booking — userId always comes from session, never from body
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        flightId,
        ticketCount,
        status: 'confirmed',
      },
      include: {
        flight: {
          select: {
            flightNumber: true,
            planet: true,
            fromLocation: true,
            toLocation: true,
            departure: true,
            arrival: true,
            duration: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Booking confirmed.', booking },
      { status: 201 }
    );

  } catch (error) {
    console.error('[POST /api/bookings]', error);
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// ── Block all other HTTP methods ───────────────────────────────
export async function PUT() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}
export async function DELETE() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}
export async function PATCH() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}