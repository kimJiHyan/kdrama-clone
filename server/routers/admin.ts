import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import {
  createDrama,
  updateDrama,
  deleteDrama,
  getAllDramas,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  getEpisodesByDramaId,
  getAllSubscriptionPlans,
  getDramaComments,
  approveComment,
  deleteComment,
} from "../db";

export const adminRouter = router({
  // ============ Drama Management ============
  drama: router({
    list: adminProcedure.query(async () => {
      return getAllDramas();
    }),

    create: adminProcedure
      .input(
        z.object({
          title: z.string().min(1),
          englishTitle: z.string().optional(),
          categoryId: z.number(),
          description: z.string().optional(),
          longDescription: z.string().optional(),
          posterUrl: z.string().optional(),
          bannerUrl: z.string().optional(),
          releaseYear: z.number().optional(),
          totalEpisodes: z.number().optional(),
          status: z.enum(["ongoing", "completed"]).optional(),
          director: z.string().optional(),
          cast: z.array(z.string()).optional(),
          isPublished: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createDrama(input);
        return { success: true };
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.object({
            title: z.string().optional(),
            englishTitle: z.string().optional(),
            categoryId: z.number().optional(),
            description: z.string().optional(),
            longDescription: z.string().optional(),
            posterUrl: z.string().optional(),
            bannerUrl: z.string().optional(),
            rating: z.number().optional(),
            releaseYear: z.number().optional(),
            totalEpisodes: z.number().optional(),
            status: z.enum(["ongoing", "completed"]).optional(),
            director: z.string().optional(),
            cast: z.array(z.string()).optional(),
            isPublished: z.boolean().optional(),
          }),
        })
      )
      .mutation(async ({ input }) => {
        await updateDrama(input.id, input.data);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteDrama(input.id);
        return { success: true };
      }),
  }),

  // ============ Category Management ============
  category: router({
    list: adminProcedure.query(async () => {
      return getAllCategories();
    }),

    create: adminProcedure
      .input(
        z.object({
          name: z.string().min(1),
          slug: z.string().min(1),
          description: z.string().optional(),
          icon: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createCategory(input);
        return { success: true };
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.object({
            name: z.string().optional(),
            slug: z.string().optional(),
            description: z.string().optional(),
            icon: z.string().optional(),
          }),
        })
      )
      .mutation(async ({ input }) => {
        await updateCategory(input.id, input.data);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteCategory(input.id);
        return { success: true };
      }),
  }),

  // ============ Episode Management ============
  episode: router({
    listByDrama: adminProcedure
      .input(z.object({ dramaId: z.number() }))
      .query(async ({ input }) => {
        return getEpisodesByDramaId(input.dramaId);
      }),

    create: adminProcedure
      .input(
        z.object({
          dramaId: z.number(),
          episodeNumber: z.number(),
          title: z.string().min(1),
          description: z.string().optional(),
          videoUrl: z.string().optional(),
          duration: z.number().optional(),
          releaseDate: z.date().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createEpisode(input);
        return { success: true };
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            videoUrl: z.string().optional(),
            duration: z.number().optional(),
            releaseDate: z.date().optional(),
          }),
        })
      )
      .mutation(async ({ input }) => {
        await updateEpisode(input.id, input.data);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteEpisode(input.id);
        return { success: true };
      }),
  }),

  // ============ Subscription Management ============
  subscription: router({
    list: adminProcedure.query(async () => {
      return getAllSubscriptionPlans();
    }),
  }),

  // ============ Comment Moderation ============
  comment: router({
    listByDrama: adminProcedure
      .input(z.object({ dramaId: z.number() }))
      .query(async ({ input }) => {
        return getDramaComments(input.dramaId);
      }),

    approve: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await approveComment(input.id);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteComment(input.id);
        return { success: true };
      }),
  }),
});
