import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/client/client';

// Required for Heroku Postgres SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const flights = [
  // Mars
  {
    flightNumber: 'ST-M01',
    planet: 'Mars',
    fromLocation: 'Earth — Kennedy Orbital Hub',
    toLocation: 'Mars — Olympus Mons Terminal',
    departure: 'Sol 14 | 06:00 UTC',
    arrival: 'Sol 221 | 14:32 UTC',
    duration: '207 days',
  },
  {
    flightNumber: 'ST-M02',
    planet: 'Mars',
    fromLocation: 'Earth — Kennedy Orbital Hub',
    toLocation: 'Mars — Hellas Basin Station',
    departure: 'Sol 14 | 11:45 UTC',
    arrival: 'Sol 224 | 08:10 UTC',
    duration: '210 days',
  },
  {
    flightNumber: 'ST-M03',
    planet: 'Mars',
    fromLocation: 'Earth — Kennedy Orbital Hub',
    toLocation: 'Mars — Valles Marineris Port',
    departure: 'Sol 15 | 22:00 UTC',
    arrival: 'Sol 223 | 17:55 UTC',
    duration: '208 days',
  },
  // Europa
  {
    flightNumber: 'ST-E01',
    planet: 'Europa',
    fromLocation: 'Earth — Kennedy Orbital Hub',
    toLocation: 'Europa — Poseidon Dock Alpha',
    departure: 'Sol 16 | 08:00 UTC',
    arrival: 'Sol 414 | 09:20 UTC',
    duration: '398 days',
  },
  {
    flightNumber: 'ST-E02',
    planet: 'Europa',
    fromLocation: 'Earth — Kennedy Orbital Hub',
    toLocation: 'Europa — Nereid Station',
    departure: 'Sol 16 | 15:30 UTC',
    arrival: 'Sol 416 | 11:00 UTC',
    duration: '400 days',
  },
  {
    flightNumber: 'ST-E03',
    planet: 'Europa',
    fromLocation: 'Earth — Kennedy Orbital Hub',
    toLocation: 'Europa — Triton Relay Outpost',
    departure: 'Sol 18 | 04:15 UTC',
    arrival: 'Sol 418 | 22:45 UTC',
    duration: '400 days',
  },
  // Titan
  {
    flightNumber: 'ST-T01',
    planet: 'Titan',
    fromLocation: 'Earth — Kennedy Orbital Hub',
    toLocation: 'Titan — Cassini Landing Zone',
    departure: 'Sol 20 | 07:00 UTC',
    arrival: 'Sol 497 | 16:40 UTC',
    duration: '477 days',
  },
  {
    flightNumber: 'ST-T02',
    planet: 'Titan',
    fromLocation: 'Earth — Kennedy Orbital Hub',
    toLocation: 'Titan — Huygens Colony Hub',
    departure: 'Sol 21 | 13:00 UTC',
    arrival: 'Sol 499 | 10:15 UTC',
    duration: '478 days',
  },
  {
    flightNumber: 'ST-T03',
    planet: 'Titan',
    fromLocation: 'Earth — Kennedy Orbital Hub',
    toLocation: 'Titan — Kraken Mare Port',
    departure: 'Sol 22 | 20:00 UTC',
    arrival: 'Sol 501 | 06:30 UTC',
    duration: '479 days',
  },
  // Lunar Gateway
  {
    flightNumber: 'ST-L01',
    planet: 'Lunar Gateway',
    fromLocation: 'Earth — Kennedy Orbital Hub',
    toLocation: 'Lunar Gateway — Platform A',
    departure: 'Sol 14 | 09:00 UTC',
    arrival: 'Sol 15 | 03:45 UTC',
    duration: '18 hrs',
  },
  {
    flightNumber: 'ST-L02',
    planet: 'Lunar Gateway',
    fromLocation: 'Earth — Kennedy Orbital Hub',
    toLocation: 'Lunar Gateway — Platform B',
    departure: 'Sol 14 | 17:00 UTC',
    arrival: 'Sol 15 | 11:30 UTC',
    duration: '18 hrs',
  },
  {
    flightNumber: 'ST-L03',
    planet: 'Lunar Gateway',
    fromLocation: 'Earth — Kennedy Orbital Hub',
    toLocation: 'Lunar Gateway — Platform C',
    departure: 'Sol 15 | 06:00 UTC',
    arrival: 'Sol 16 | 00:15 UTC',
    duration: '18 hrs',
  },
];

async function main() {
  console.log('🚀 Seeding flights...');

  for (const flight of flights) {
    await prisma.flight.upsert({
      where: { flightNumber: flight.flightNumber },
      update: flight,
      create: flight,
    });
    console.log(`  ✓ ${flight.flightNumber} — ${flight.toLocation}`);
  }

  console.log(`\n✅ Seeded ${flights.length} flights successfully.`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });