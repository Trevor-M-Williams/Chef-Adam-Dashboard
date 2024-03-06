import { cn } from "@/lib/utils";
import React from "react";

export default function Title({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <h1 className={cn("text-2xl font-semibold", className)}>{text}</h1>;
}
