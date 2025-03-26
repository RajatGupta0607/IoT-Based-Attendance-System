import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const attendanceRouter = createTRPCRouter({
  createEntity: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        prn: z.coerce.number(),
        role: z.enum(["USER", "ADMIN"]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const entity = await ctx.db.entity.create({
          data: input,
        });

        if (!entity) {
          throw new TRPCError({
            message: "Failed to create entity",
            code: "INTERNAL_SERVER_ERROR",
          });
        }

        return entity;
      } catch (error) {
        throw new TRPCError({
          message: (error as Error).message,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  getAllEntityWithAttendance: protectedProcedure.query(async ({ ctx }) => {
    try {
      const entityWithAttendance = await ctx.db.entity.findMany({
        where: {
          NOT: {
            role: "ADMIN",
          },
        },
        include: {
          attendances: true,
        },
      });

      if (!entityWithAttendance || entityWithAttendance.length === 0) {
        throw new TRPCError({
          message: "No entity with attendance found",
          code: "NOT_FOUND",
        });
      }
    } catch (error) {
      throw new TRPCError({
        message: (error as Error).message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),

  getEntityWithAttendance: protectedProcedure.query(async ({ ctx }) => {
    try {
      const entityWithAttendance = await ctx.db.entity.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          attendances: true,
        },
      });

      if (!entityWithAttendance) {
        throw new TRPCError({
          message: "Entity does not exist",
          code: "NOT_FOUND",
        });
      }
    } catch (error) {
      throw new TRPCError({
        message: (error as Error).message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
