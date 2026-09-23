import { z } from "zod";

export const intakeSchema = z.object({
  recipientName: z.string().min(1).max(80),
  relationship: z.string().min(1).max(80),
  occasion: z.string().min(1).max(80),
  genre: z.string().min(1).max(80),
  vocalPreference: z.string().min(1).max(80),
  howYouMet: z.string().min(10).max(1800),
  favoriteMemory: z.string().min(10).max(1800),
  smallDetails: z.string().min(10).max(1800),
  hardMoment: z.string().max(1800).optional().default(""),
  whatYouWantToSay: z.string().min(10).max(1800),
  mustInclude: z.string().max(800).optional().default(""),
  email: z.string().email(),
});

export type Intake = z.infer<typeof intakeSchema>;

export function buildMusicBrief(input: Intake) {
  return [
    `Write and perform a ${input.genre} song for ${input.recipientName}.`,
    `Relationship: ${input.relationship}. Occasion: ${input.occasion}. Vocal preference: ${input.vocalPreference}.`,
    "Use the customer's details below as the factual source of truth. Preserve their specificity and emotional texture. Do not invent biographical facts, dates, places, milestones, or relationship details that are not supported by the input.",
    "Do not rewrite the memories into a generic summary before songwriting. Let the concrete details drive the lyrics naturally.",
    `HOW WE MET (customer's words):\n${input.howYouMet}`,
    `FAVORITE MEMORY (customer's words):\n${input.favoriteMemory}`,
    `SMALL / SPECIFIC DETAILS (customer's words):\n${input.smallDetails}`,
    input.hardMoment ? `A MOMENT THAT MATTERED (customer's words):\n${input.hardMoment}` : "",
    `WHAT I WANT THEM TO KNOW (customer's words):\n${input.whatYouWantToSay}`,
    input.mustInclude ? `MUST INCLUDE IF IT FITS NATURALLY:\n${input.mustInclude}` : "",
  ].filter(Boolean).join("\n\n");
}
