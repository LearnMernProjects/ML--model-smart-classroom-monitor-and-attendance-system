"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const heading = pathname === "/RoleSelectionPage" ? "Dashboard" : "";

  return (
    <div className="flex items-center justify-between py-4 px-6 bg-gray-100 shadow-md w-full">
      <h1 className="text-3xl font-bold text-gray-800"></h1>
    </div>
  );
}
