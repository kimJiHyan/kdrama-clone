import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { publicRouter } from "./routers/public";
import { adminRouter } from "./routers/admin";

export const appRouter = router({
  auth: router({
    me: publicProcedure.query(({ ctx }) => ctx.user),
  }),

  // Public routes
  public: publicRouter,

  // Admin routes
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
