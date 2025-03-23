"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarButton, SidebarLink } from "./ui/sidebar";
import { IconArrowLeft, IconHome, IconUserBolt } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function SidebarDemo({
  user,
  children,
}: {
  user: {
    email?: string | null;
    id?: string | null;
    image?: string | null;
    name?: string | null;
    role?: "USER" | "ADMIN";
  };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const studentLinks = [
    {
      label: "Home",
      href: "/dashboard",
      icon: (
        <IconHome
          className={`h-5 w-5 shrink-0 ${pathname === "/dashboard" ? "text-[#800080]" : "text-neutral-700"} `}
        />
      ),
    },
    {
      label: "Attendance",
      href: "/dashboard/attendance",
      icon: (
        <IconUserBolt
          className={`h-5 w-5 shrink-0 ${pathname === "/dashboard/attendance" ? "text-[#800080]" : "text-neutral-700"} `}
        />
      ),
    },
  ];

  const adminLinks = [
    {
      label: "Home",
      href: "/dashboard",
      icon: (
        <IconHome
          className={`h-5 w-5 shrink-0 ${pathname === "/dashboard" ? "text-[#800080]" : "text-neutral-700"} `}
        />
      ),
    },
    {
      label: "Students",
      href: "/dashboard/student",
      icon: (
        <IconUserBolt
          className={`h-5 w-5 shrink-0 ${pathname === "/dashboard/student" ? "text-[#800080]" : "text-neutral-700"} `}
        />
      ),
    },
    {
      label: "Faculty",
      href: "/dashboard/faculty",
      icon: (
        <IconUserBolt
          className={`h-5 w-5 shrink-0 ${pathname === "/dashboard/faculty" ? "text-[#800080]" : "text-neutral-700"} `}
        />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {user.role === "USER" &&
                studentLinks.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              {user.role === "ADMIN" &&
                adminLinks.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
            </div>
          </div>
          <div>
            <SidebarButton
              link={{
                label: "Logout",
                icon: (
                  <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700" />
                ),
              }}
            />
            <SidebarLink
              link={{
                label: user.name ?? "Unknown",
                href: "#",
                icon: (
                  <Image
                    src={user.image ?? "/avatar.jpg"}
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard>{children}</Dashboard>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-medium text-[#800080]"
      >
        Dashboard
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-1">{children}</div>;
};
