import { CalendarAttendance } from "@/components/CalendarAttendance";

const attendanceList = [
  {
    name: "Ayush Warrier",
    validDates: [
      new Date(2025, 2, 1),
      new Date(2025, 2, 4),
      new Date(2025, 2, 7),
    ],
  },
];

function Page() {
  return (
    <div className="w-full p-[50px]">
      <h1 className="text-4xl font-bold text-[#800080]">
        Student Attendace List
      </h1>
      <CalendarAttendance attendanceList={attendanceList} />
    </div>
  );
}

export default Page;
