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

  getAllStudentsCount: protectedProcedure.query(async ({ ctx }) => {
    try {
      const count = await ctx.db.entity.count({
        where: {
          role: "USER",
        },
      });

      return count;
    } catch (error) {
      throw new TRPCError({
        message: (error as Error).message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),

  getAllPresentStudentsCount: protectedProcedure.query(async ({ ctx }) => {
    try {
      const count = await ctx.db.attendance.count({
        where: {
          AND: [
            {
              entity: {
                role: "USER",
              },
            },
            {
              date: {
                gte: new Date(new Date().setHours(0, 0, 0, 0)),
                lte: new Date(new Date().setHours(23, 59, 59, 999)),
              },
            },
          ],
        },
      });

      return count;
    } catch (error) {
      throw new TRPCError({
        message: (error as Error).message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),

  getAllFaculty: protectedProcedure.query(async ({ ctx }) => {
    try {
      const faculty = await ctx.db.entity.findMany({
        where: {
          role: "ADMIN",
        },
      });

      return faculty;
    } catch (error) {
      throw new TRPCError({
        message: (error as Error).message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),

  getAllStudentsWithAttendance: protectedProcedure.query(async ({ ctx }) => {
    try {
      const students = await ctx.db.entity.findMany({
        where: {
          role: "USER",
        },
        include: {
          attendances: true,
        },
      });

      return students;
    } catch (error) {
      throw new TRPCError({
        message: (error as Error).message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),

  isStudentPresent: protectedProcedure.query(async ({ ctx }) => {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    try {
      const isPresent = await ctx.db.attendance.findFirst({
        where: {
          AND: [
            {
              userId: ctx.session.user.id,
            },
            {
              date: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          ],
        },
      });

      return !!isPresent;
    } catch (error) {
      throw new TRPCError({
        message: (error as Error).message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),

  getStudentAttendance: protectedProcedure.query(async ({ ctx }) => {
    try {
      const attendances = await ctx.db.entity.findMany({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          attendances: true,
        },
      });

      return attendances;
    } catch (error) {
      throw new TRPCError({
        message: (error as Error).message,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
