"use client";
import { useState } from "react";

import { useAuth } from "@clerk/nextjs";

import CopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export default function ShareOptions({ form }: { form: Form }) {
  const [copied, setCopied] = useState(false);

  const { userId } = useAuth();
  const chefId = userId;
  const formId = form.id;

  const formUrl = `${location.origin}/public/forms/?chefId=${chefId}&formId=${formId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-md">Link:</div>
      <div className="">
        {copied ? (
          <div className="flex items-center gap-2">
            <CheckIcon fontSize="small" />
            <div className="text-sm font-semibold">Copied!</div>
          </div>
        ) : (
          <CopyIcon
            fontSize="small"
            className="cursor-pointer"
            onClick={handleCopy}
          />
        )}
      </div>
    </div>
  );
}
