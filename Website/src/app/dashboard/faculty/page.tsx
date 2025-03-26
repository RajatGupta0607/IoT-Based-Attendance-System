"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";

function Page() {
  const data = api.attendance.getAllFaculty.useQuery();
  return (
    <div className="max-h-screen w-full p-[50px]">
      <div className="h-[847px] overflow-y-auto rounded-lg border border-[#000] px-[25px] py-[33px]">
        <h1 className="text-[32px] font-bold text-[#800080]">Faculty List</h1>
        {data.isLoading ? (
          <div className="flex w-full items-center justify-center">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" color="#800080" />
          </div>
        ) : (
          <Table className="mt-[45px]">
            <TableHeader>
              <TableRow>
                <TableHead>Faculty Id</TableHead>
                <TableHead>Faculty Name</TableHead>
                <TableHead>Email Id</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data?.map((d, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{d.prn}</TableCell>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default Page;
