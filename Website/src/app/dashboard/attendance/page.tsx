"use client";

import { CalendarAttendance } from "@/components/CalendarAttendance";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";

function Page() {
  const data = api.attendance.getStudentAttendance.useQuery();
  const attendanceList =
    data.data?.map((s) => ({
      name: s.name,
      validDates: s.attendances.map((a) => a.date),
    })) ?? [];
  return (
    <div className="w-full p-[50px]">
      <h1 className="text-4xl font-bold text-[#800080]">
        Student Attendace List
      </h1>
      {data.isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Loader2 className="mr-2 h-10 w-10 animate-spin" color="#800080" />
        </div>
      ) : (
        <CalendarAttendance attendanceList={attendanceList ?? []} />
      )}
    </div>
  );
}

export default Page;
