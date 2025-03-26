"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format, isSameDay, isAfter, startOfToday } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface AttendanceData {
  name: string;
  validDates: Date[];
}

interface CalendarAttendanceProps {
  attendanceList: AttendanceData[];
}

/**
 * Displays days in the current (or navigated) month in a row with dots:
 * - Green dot if day <= today and in validDates
 * - Red dot if day <= today and not in validDates
 * - Gray dot if day > today
 */
export function CalendarAttendance({
  attendanceList,
}: CalendarAttendanceProps) {
  const today = startOfToday(); // e.g. 2025-03-24 00:00:00
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Helper: how many days in a given month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // For day X in the current month/year, produce a Date
  const getDateForDay = (day: number) => {
    return new Date(currentYear, currentMonth, day);
  };

  const totalDays = getDaysInMonth(currentMonth, currentYear);

  // Build an array of day numbers [1..totalDays]
  const daysOfMonth = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Navigation: next/prev month
  const goToNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const goToPrevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Label for the current month, e.g. "Mar 2025"
  const monthLabel = format(new Date(currentYear, currentMonth, 1), "MMM yyyy");

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Header with month nav */}
      <div className="mt-5 flex items-center justify-center space-x-2">
        <Button variant="outline" size="icon" onClick={goToPrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-xl font-semibold">{monthLabel}</span>
        <Button variant="outline" size="icon" onClick={goToNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Table with day headers + rows for each name */}
      <div className="w-full overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              {daysOfMonth.map((day) => (
                <TableHead key={day} className="text-xl">
                  {day}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceList.map((person) => (
              <TableRow key={person.name}>
                {/* Name column */}
                <TableCell className="text-2xl font-medium">
                  {person.name}
                </TableCell>
                {/* One cell (dot) per day */}
                {daysOfMonth.map((day) => {
                  const thisDate = getDateForDay(day);
                  const isOnOrBeforeToday = !isAfter(thisDate, today);
                  const isInArray = person.validDates.some((d) =>
                    isSameDay(d, thisDate),
                  );

                  // Determine dot color
                  let dotColor = "bg-gray-400"; // future date
                  if (isOnOrBeforeToday) {
                    dotColor = isInArray ? "bg-green-500" : "bg-red-500";
                  }

                  return (
                    <TableCell key={day}>
                      <div className={cn("h-4 w-4 rounded-full", dotColor)} />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
