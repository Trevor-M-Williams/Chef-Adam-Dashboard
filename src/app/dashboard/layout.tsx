import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chef Adam Dashboard",
  description: "A dashboard for Chef Adam's and orders",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex flex-col">
      <div className="relative h-full w-full flex overflow-hidden">
        {children}
      </div>
    </div>
  );
}
