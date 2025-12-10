import { createEventSchema } from "@/zod/createEventSchema";
import { createTRPCRouter, protectedProcedure } from "../init";
import db from "@/db/drizzle";
import { event } from "../../../schema";
import { uploadBytesToCloudinary } from "@/lib/upload-file";
import { z } from "zod";
import { eq, desc, lt, and } from "drizzle-orm";

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
          })
          .returning();

        return new_event;
      } catch (error) {
        throw new Error("Failed to create event");
      }
    }),

  // GET ONE BY ID
 getOne: protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input,ctx }) => {
    const data = await db.query.event.findFirst({
      where: and(
        eq(event.id, input.id),
        eq(event.creator_id, ctx.auth.user.id)
      ),
    });

    if (!data) throw new Error("Event not found");
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

    return { success: true };
  }),


  // PAGINATED GET ALL (Cursor Pagination)
  getAll: protectedProcedure
    .input(
      z.object({
        cursor: z.string().nullish(), // last item id
        limit: z.number().min(1).max(50).default(10),
      })
    )
    .query(async ({ input,ctx  }) => {
      const limit = input.limit;

      let rows = await db
        .select()
        .from(event)
        .where(
          input.cursor ? and(lt(event.id, input.cursor),eq(event.creator_id,ctx.auth.user.id)) :eq(event.creator_id,ctx.auth.user.id),
          
        )
        .orderBy(desc(event.createdAt))
        .limit(limit + 1); // +1 to check if there's a next page

      let nextCursor: string | null = null;

      if (rows.length > limit) {
        const next = rows.pop(); // remove cursor element
        nextCursor = next?.id ?? null;
      }

      return {
        items: rows,
        nextCursor,
      };
    }),
});
