import {  createTRPCRouter } from '../init';
import { EventRouter } from './eventsRouter';
import { ParticipantsRouter } from './participantsRouter';
export const appRouter = createTRPCRouter({
 event:EventRouter,
 participants: ParticipantsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;