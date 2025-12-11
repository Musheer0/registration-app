import { createEventSchema } from "@/zod/createEventSchema";
import { createTRPCRouter, protectedProcedure } from "../init";
import db from "@/db/drizzle";
import { event, eventRegisteredUsers } from "../../../schema";
import { uploadBytesToCloudinary } from "@/lib/upload-file";
import { z } from "zod";
import { eq, desc, lt, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { cache, cacheKeys } from "@/lib/redis";

export const EventRouter = createTRPCRouter({
  // CREATE
  create: protectedProcedure
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const imgs = { banner: "", pfp: "" };
      
        if (input.eventPoster) {
          const banner = await uploadBytesToCloudinary(
            Uint8Array.from(atob(input.eventPoster.bytes), (c) =>
              c.charCodeAt(0)
            ),
            input.eventPoster.type
          );
          imgs.banner = banner.url;
        }

        if (input.eventLogo) {
          const pfp = await uploadBytesToCloudinary(
            Uint8Array.from(atob(input.eventLogo.bytes), (c) =>
              c.charCodeAt(0)
            ),
            input.eventLogo.type
          );
          imgs.pfp = pfp.url;
        }

        delete input.eventLogo;
        delete input.eventPoster;

        const new_event = await db
          .insert(event)
          .values({
            ...input,
            creator_id: ctx.auth.user.id,
            logo: imgs.pfp,
            eventPoster: imgs.banner,
            maxParticipants:Number(input.maxParticipants)
          })
          .returning();

        // Invalidate cache for user's events list
        await cache.del(cacheKeys.eventsByUser(ctx.auth.user.id));
        await cache.del(cacheKeys.eventsPublic());

        return new_event;
      } catch (error) {
        console.log(error)
        throw new Error("Failed to create event");
      }
    }),

  // GET ONE BY ID
 getOne: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input,ctx }) => {
    const cacheKey = cacheKeys.event(input.id);
    
    // Try to get from cache first
    const cached = await cache.get<typeof data>(cacheKey);
    if (cached) {
      return cached;
    }

    const data = await db.query.event.findFirst({
      where: and(
        eq(event.id, input.id),
      ),
    });

    if (!data) throw new Error("Event not found");
    
    // Cache for 5 minutes (300 seconds)
    await cache.set(cacheKey, data, 300);
    
    return data;
  }),


  // DELETE
delete: protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.auth.user.id;

    // 1️⃣ Fetch event from DB
    const existing = await db.query.event.findFirst({
      where: eq(event.id, input.id),
    });

    // 2️⃣ If no event -> throw
    if (!existing) throw new Error("Event not found");

    // 3️⃣ AUTH CHECK FROM DB (THIS is what you're asking for)
    if (existing.creator_id !== userId) {
      throw new Error("BRO YOU CANNOT DELETE THIS 💀");
    }

    // 4️⃣ Safe to delete
    await db.delete(event).where(eq(event.id, input.id));

    // Invalidate cache
    await cache.del(cacheKeys.event(input.id));
    await cache.del(cacheKeys.eventsByUser(userId));
    await cache.del(cacheKeys.eventsPublic());
    await cache.del(cacheKeys.eventStats(input.id));
    await cache.del(cacheKeys.registeredUsers(input.id));

    return { success: true };
  }),


 // GET 10 NEWEST ONLY  
getAll: protectedProcedure.query(async ({ ctx }) => {
  const cacheKey = cacheKeys.eventsByUser(ctx.auth.user.id);
  
  // Try to get from cache first
  const cached = await cache.get<typeof rows>(cacheKey);
  if (cached) {
    return cached;
  }

  // fetch ONLY latest 10 events for the logged-in user
  const rows = await db
    .select()
    .from(event)
    .where(eq(event.creator_id, ctx.auth.user.id))
    .orderBy(desc(event.createdAt))
    .limit(10);

  // Cache for 2 minutes (120 seconds)
  await cache.set(cacheKey, rows, 120);

  return rows; // no pagination, no cursor, raw 10 newest
}),
getAllPublic: protectedProcedure.query(async ({ ctx }) => {
  const cacheKey = cacheKeys.eventsPublic();
  
  // Try to get from cache first
  const cached = await cache.get<typeof rows>(cacheKey);
  if (cached) {
    return cached;
  }

  // fetch ONLY latest 10 events for the logged-in user
  const rows = await db
    .select()
    .from(event)
    .orderBy(desc(event.createdAt))
    .limit(10);

  // Cache for 2 minutes (120 seconds)
  await cache.set(cacheKey, rows, 120);

  return rows; // no pagination, no cursor, raw 10 newest
}),

  // UPDATE/EDIT EVENT
  update: protectedProcedure
    .input(
      createEventSchema.extend({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.user.id;
      const { id, ...updateData } = input;

      // Verify user owns the event
      const existing = await db.query.event.findFirst({
        where: eq(event.id, id),
      });

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      if (existing.creator_id !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to edit this event",
        });
      }

      try {
        const imgs = { banner: existing.eventPoster || "", pfp: existing.logo || "" };

        if (input.eventPoster) {
          const banner = await uploadBytesToCloudinary(
            Uint8Array.from(atob(input.eventPoster.bytes), (c) =>
              c.charCodeAt(0)
            ),
            input.eventPoster.type
          );
          imgs.banner = banner.url;
        }

        if (input.eventLogo) {
          const pfp = await uploadBytesToCloudinary(
            Uint8Array.from(atob(input.eventLogo.bytes), (c) =>
              c.charCodeAt(0)
            ),
            input.eventLogo.type
          );
          imgs.pfp = pfp.url;
        }

        const { eventPoster, eventLogo, ...rest } = updateData;

        const updated = await db
          .update(event)
          .set({
            ...rest,
            logo: imgs.pfp,
            eventPoster: imgs.banner,
            maxParticipants: Number(updateData.maxParticipants) || null,
          })
          .where(eq(event.id, id))
          .returning();

        // Invalidate cache
        await cache.del(cacheKeys.event(id));
        await cache.del(cacheKeys.eventsByUser(userId));
        await cache.del(cacheKeys.eventsPublic());
        await cache.del(cacheKeys.eventStats(id));
        await cache.del(cacheKeys.registeredUsers(id));

        return updated[0];
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update event",
        });
      }
    }),

  // GET EVENT STATISTICS (admin only - event creator)
  getStatistics: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.user.id;
      const cacheKey = cacheKeys.eventStats(input.eventId);

      // Try to get from cache first
      const cached = await cache.get<{
        event: typeof eventData;
        totalRegistered: number;
        maxParticipants: number;
        registrationRate: number;
        availableSpots: number | null;
        registrationsByDate: Record<string, number>;
        registrations: typeof registeredUsers;
      }>(cacheKey);
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
          message: "You don't have permission to view statistics for this event",
        });
      }

      // Get registered users count
      const registeredUsers = await db
        .select()
        .from(eventRegisteredUsers)
        .where(eq(eventRegisteredUsers.eventId, input.eventId));

      const totalRegistered = registeredUsers.length;
      const maxParticipants = eventData.maxParticipants || 0;
      const registrationRate = maxParticipants > 0 
        ? (totalRegistered / maxParticipants) * 100 
        : 0;

      // Group registrations by date
      const registrationsByDate = registeredUsers.reduce((acc, reg) => {
        const date = new Date(reg.createdAt).toLocaleDateString("en-US");
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const result = {
        event: eventData,
        totalRegistered,
        maxParticipants,
        registrationRate: Math.round(registrationRate * 100) / 100,
        availableSpots: maxParticipants > 0 ? maxParticipants - totalRegistered : null,
        registrationsByDate,
        registrations: registeredUsers,
      };

      // Cache for 1 minute (60 seconds) - statistics change frequently
      await cache.set(cacheKey, result, 60);

      return result;
    }),
});
