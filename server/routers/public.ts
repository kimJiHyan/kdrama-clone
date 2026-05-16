import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  getAllDramas,
  getDramaById,
  getEpisodesByDramaId,
  getAllCategories,
  getUserFavorites,
  addFavorite,
  removeFavorite,
  getDramaComments,
  createComment,
  getAllSubscriptionPlans,
} from "../db";

export const publicRouter = router({
  // ============ Drama Browsing ============
  drama: router({
    list: publicProcedure.query(async () => {
      return getAllDramas();
    }),

    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getDramaById(input.id);
      }),

    episodes: publicProcedure
      .input(z.object({ dramaId: z.number() }))
      .query(async ({ input }) => {
        return getEpisodesByDramaId(input.dramaId);
      }),
  }),

  // ============ Category Browsing ============
  category: router({
    list: publicProcedure.query(async () => {
      return getAllCategories();
    }),
  }),

  // ============ Favorites (Protected) ============
  favorite: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserFavorites(ctx.user.id);
    }),

    add: protectedProcedure
      .input(z.object({ dramaId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await addFavorite(ctx.user.id, input.dramaId);
        return { success: true };
      }),

    remove: protectedProcedure
      .input(z.object({ dramaId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await removeFavorite(ctx.user.id, input.dramaId);
        return { success: true };
      }),
  }),

  // ============ Comments ============
  comment: router({
    list: publicProcedure
      .input(z.object({ dramaId: z.number() }))
      .query(async ({ input }) => {
        return getDramaComments(input.dramaId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          dramaId: z.number(),
          content: z.string().min(1).max(1000),
          rating: z.number().min(0).max(10).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await createComment({
          userId: ctx.user.id,
          dramaId: input.dramaId,
          content: input.content,
          rating: input.rating || 0,
          isApproved: false,
        });
        return { success: true };
      }),
  }),

  // ============ Subscriptions ============
  subscription: router({
    listPlans: publicProcedure.query(async () => {
      return getAllSubscriptionPlans();
    }),
  }),
});
