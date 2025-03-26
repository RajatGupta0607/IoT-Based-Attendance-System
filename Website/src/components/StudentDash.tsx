"use client";

import { api } from "@/trpc/react";
import { IdCard, Loader2 } from "lucide-react";

function StudentDash({ name }: { name: string }) {
  const isPresentQuery = api.attendance.isStudentPresent.useQuery();
  const isPresent = isPresentQuery.data ?? false;
  return (
    <div className="w-full rounded-lg border border-[#000] p-[30px] pr-0">
      {isPresentQuery.isLoading ? (
        <div className="flex w-full items-center justify-center">
          <Loader2 className="mr-2 h-10 w-10 animate-spin" color="#800080" />
        </div>
      ) : (
        <>
          <div className="flex w-full flex-row flex-wrap items-center justify-between">
            <p className="text-4xl">
              Welcome Back,{" "}
              <span className="font-bold text-[#800080]">
                {name.split(" ")[0]}
              </span>
            </p>
            <div
              className={`rounded-bl-lg rounded-tl-lg border border-[#000] px-5 py-[10px] text-[20px] text-white ${isPresent ? "bg-[#008000]" : "bg-[#ff0000]"}`}
            >
              {isPresent ? "Present" : "Absent"}
            </div>
          </div>
          <p className="mt-5 text-[28px]">
            You are{" "}
            <span className="font-bold">
              {isPresent ? "" : "Not"} Marked Present
            </span>{" "}
            today!
          </p>
          <hr className="mt-5 border-[#000]" />
          <div className="mb-[18px] mt-12 flex flex-row items-center gap-5">
            <IdCard size={30} />
            <p>{isPresent ? "Card Scanned at 11:59 AM" : "Card Not Scanned"}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default StudentDash;
