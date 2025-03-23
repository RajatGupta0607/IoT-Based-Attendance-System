// import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const attendanceRouter = createTRPCRouter({
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
