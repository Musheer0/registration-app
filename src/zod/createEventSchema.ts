import { z } from "zod"

export const createEventSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  description: z.string().min(1, "Description is required"),
  venue: z.string().min(1, "Venue is required"),
  dateOfEvent: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  eventStartTime: z.string().min(1, "Start time is required"),
  eventEndTime: z.string().min(1, "End time is required"),
  maxParticipants: z.number().int().nonnegative(),
  registrationEnd: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  clubName: z.string().min(1, "Club name is required").optional(),
  googleFormLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  // File upload fields - stores Base64 bytes and MIME type
  eventPoster: z
    .object({
      bytes: z.string(),
      type: z.string(),
      name: z.string(),
      size: z.number(),
    })
    .optional(),
  eventLogo: z
    .object({
      bytes: z.string(),
      type: z.string(),
      name: z.string(),
      size: z.number(),
    })
    .optional(),
})

export type CreateEventInput = z.infer<typeof createEventSchema>
