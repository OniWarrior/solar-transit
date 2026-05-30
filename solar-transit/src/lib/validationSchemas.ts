import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string()
    .email('Invalid email address.')
    .min(1, 'Email is required.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(72, 'Password must be under 72 characters.'),
});

export const bookingSchema = z.object({
  flightId: z
    .string()
    .min(1, 'Flight ID is required.'),
  ticketCount: z
    .number()
    .int('Ticket count must be a whole number.')
    .min(1, 'Must book at least 1 ticket.')
    .max(10, 'Cannot book more than 10 tickets.'),
});
