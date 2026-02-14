import { z } from 'zod';

export const memberApplicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  motivation: z.string().min(20).max(1200),
  honeypot: z.string().optional().default('')
});

export const eventSchema = z.object({
  title: z.string().min(3),
  summary: z.string().min(10),
  area: z.string().min(2),
  exactAddress: z.string().min(10),
  startDateTime: z.string(),
  endDateTime: z.string(),
  capacity: z.number().int().positive().max(300),
  recurrenceEnabled: z.boolean(),
  recurrenceFreq: z.enum(['WEEKLY', 'MONTHLY']).optional(),
  recurrenceInterval: z.number().int().min(1).max(4).optional(),
  recurrenceCount: z.number().int().min(1).max(52).optional()
});

export const rsvpSchema = z.object({
  contactName: z.string().max(80).optional().or(z.literal('')),
  contactEmail: z.string().email().optional().or(z.literal('')),
  honeypot: z.string().optional().default('')
});

export const flagSchema = z.object({
  chatSessionId: z.string().optional(),
  reason: z.string().min(2).max(200),
  reporterType: z.enum(['visitor', 'volunteer'])
});
