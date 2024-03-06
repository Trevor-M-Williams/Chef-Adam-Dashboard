"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton({ className }: { className?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className={cn(
        className,
        pending && "bg-pending hover:bg-pending cursor-not-allowed"
      )}
    >
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}
