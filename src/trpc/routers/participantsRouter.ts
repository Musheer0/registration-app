import { createTRPCRouter, protectedProcedure } from "../init";
import db from "@/db/drizzle";
import { eventRegisteredUsers, event } from "../../../schema";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { cache, cacheKeys } from "@/lib/redis";

export const ParticipantsRouter = createTRPCRouter({
  register: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        usn: z.string().min(1, "USN is required"),
        phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Get name and email from context (session)
        const name = ctx.auth.user.name;
        const email = ctx.auth.user.email;
        const userId = ctx.auth.user.id;

        if (!name || !email) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Name and email are required in your profile",
          });
        }

        // Check if event exists
        const eventExists = await db.query.event.findFirst({
          where: eq(event.id, input.eventId),
        });

        if (!eventExists) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Event not found",
          });
        }

        // Check if user is already registered
        const existingRegistration = await db.query.eventRegisteredUsers.findFirst({
          where: and(
            eq(eventRegisteredUsers.userId, userId),
            eq(eventRegisteredUsers.eventId, input.eventId)
          ),
        });

        if (existingRegistration) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "You are already registered for this event",
          });
        }

        // Check if registration is still open
        if (eventExists.registrationEnd) {
          const registrationEndDate = new Date(eventExists.registrationEnd);
          if (registrationEndDate < new Date()) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Registration for this event has ended",
            });
          }
        }

        // Check if event has reached max participants
        if (eventExists.maxParticipants) {
          const currentParticipants = await db
            .select()
            .from(eventRegisteredUsers)
            .where(eq(eventRegisteredUsers.eventId, input.eventId));

          if (currentParticipants.length >= eventExists.maxParticipants) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Event has reached maximum participants",
            });
          }
        }

        // Register the user
        const registration = await db
          .insert(eventRegisteredUsers)
          .values({
            eventId: input.eventId,
            userId: userId,
            name: name,
            email: email,
            usn: input.usn,
            phoneNumber: input.phoneNumber,
          })
          .returning();

        // Invalidate cache for event statistics and registered users
        await cache.del(cacheKeys.eventStats(input.eventId));
        await cache.del(cacheKeys.registeredUsers(input.eventId));
        await cache.del(cacheKeys.event(input.eventId));

        return registration[0];
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to register for event",
        });
      }
    }),

  // Get registration status for a user and event
  getRegistrationStatus: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.user.id;

      const registration = await db.query.eventRegisteredUsers.findFirst({
        where: and(
          eq(eventRegisteredUsers.userId, userId),
          eq(eventRegisteredUsers.eventId, input.eventId)
        ),
      });

      return {
        isRegistered: !!registration,
        registration: registration || null,
      };
    }),

  // Get all registered users for an event (admin only - event creator)
  getRegisteredUsers: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.user.id;
      const cacheKey = cacheKeys.registeredUsers(input.eventId);

      // Try to get from cache first
      const cached = await cache.get<typeof registrations>(cacheKey);
      if (cached) {
        return cached;
      }

      // Verify user owns the event
      const eventData = await db.query.event.findFirst({
        where: eq(event.id, input.eventId),
      });

      if (!eventData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      if (eventData.creator_id !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to view registered users for this event",
        });
      }

      const registrations = await db.query.eventRegisteredUsers.findMany({
        where: eq(eventRegisteredUsers.eventId, input.eventId),
        orderBy: (users, { desc }) => [desc(users.createdAt)],
      });

      // Cache for 1 minute (60 seconds) - registrations change frequently
      await cache.set(cacheKey, registrations, 60);

      return registrations;
    }),
});

