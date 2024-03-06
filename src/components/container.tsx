import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="h-full w-full max-w-5xl mx-auto p-6">{children}</div>;
}
