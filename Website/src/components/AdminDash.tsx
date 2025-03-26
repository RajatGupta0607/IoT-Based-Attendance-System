"use client";

import { api } from "@/trpc/react";
import AddUserForm from "./AddUserForm";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

function AdminDash() {
  const allStudents = api.attendance.getAllStudentsCount.useQuery();
  const presentStudents = api.attendance.getAllPresentStudentsCount.useQuery();
  const absentStudents = (allStudents.data ?? 0) - (presentStudents.data ?? 0);
  return (
    <div>
      <div className="flex w-full justify-end">
        <AddUserForm>
          <Button className="bg-[#800080] hover:bg-[#691369]">Add User</Button>
        </AddUserForm>
      </div>
      <div className="mt-11 flex flex-row flex-wrap justify-center gap-10">
        <DashCard
          text="Total No. of Students"
          data={allStudents.data ?? 0}
          isLoading={allStudents.isLoading}
        />
        <DashCard
          text="No. of Students Present"
          data={presentStudents.data ?? 0}
          isLoading={presentStudents.isLoading}
        />
        <DashCard
          text="No. of Students Absent"
          data={absentStudents}
          isLoading={allStudents.isLoading || presentStudents.isLoading}
        />
      </div>
    </div>
  );
}

function DashCard({
  text,
  data,
  isLoading,
}: {
  text: string;
  data: number;
  isLoading: boolean;
}) {
  return (
    <div className="flex min-h-[250px] w-full max-w-[320px] flex-col gap-9 rounded-lg border border-[#000] p-[25px]">
      <p className="text-[32px] font-bold">{text}</p>
      {isLoading ? (
        <div className="flex w-full justify-end">
          <Loader2 className="mr-2 h-10 w-10 animate-spin" color="#800080" />
        </div>
      ) : (
        <p className="w-full text-right text-[50px] font-bold text-[#800080]">
          {data}
        </p>
      )}
    </div>
  );
}

export default AdminDash;
