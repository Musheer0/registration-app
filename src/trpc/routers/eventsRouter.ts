import { createEventSchema } from "@/zod/createEventSchema";
import { createTRPCRouter, protectedProcedure } from "../init";
import db from "@/db/drizzle";
import { event } from "../../../schema";

export const EventRouter = createTRPCRouter({
    create: protectedProcedure.input(createEventSchema).mutation(async({ctx,input})=>{
        const new_event = await db.insert(event)
    })
})