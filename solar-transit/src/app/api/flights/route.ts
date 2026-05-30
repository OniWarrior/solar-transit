import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// ── GET /api/flights ───────────────────────────────────────────
// Returns all available flights, optionally filtered by planet.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const planet = searchParams.get('planet');

    const flights = await prisma.flight.findMany({
      where: planet ? { planet } : undefined,
      orderBy: { flightNumber: 'asc' },
    });

    return NextResponse.json({ flights }, { status: 200 });

  } catch (error) {
    console.error('[GET /api/flights]', error);
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// ── Block all other HTTP methods ───────────────────────────────
export async function POST() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}
export async function PUT() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}
export async function DELETE() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}
