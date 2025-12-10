import {  createTRPCRouter } from '../init';
import { EventRouter } from './eventsRouter';
export const appRouter = createTRPCRouter({
 event:EventRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;