import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Chef SAAS",
  description: "Chef SAAS is a platform for chefs to manage their business.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="fixed inset-0 flex flex-col">
        <Navbar />

        <div className="relative h-full w-full flex overflow-hidden">
          {children}
        </div>
      </div>
    </ClerkProvider>
  );
}
