"use client";
import { useState, useEffect } from "react";

import SubmissionsTable from "@/components/submissions-table";
import SubmissionDetails from "@/components/submission-details";
import Title from "@/components/title";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Submissions() {
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);
  const [currentSubmission, setCurrentSubmission] = useState<Submission | null>(
    null
  );
  const [notesMode, setNotesMode] = useState(false);

  useEffect(() => {
    async function fetchSubmissions() {
      const response = await fetch("/api/submissions");
      const data = await response.json();
      setSubmissions(data);
      setCurrentSubmission(data[0]);
    }

    fetchSubmissions();
  }, []);

  return (
    <div className="h-full w-full grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
      <div className="h-full pt-6 border-r overflow-auto">
        <div className="h-full w-full flex flex-col">
          <Title text="Submissions" className="px-6" />
          <ScrollArea className="flex-grow px-6">
            <SubmissionsTable
              submissions={submissions}
              currentSubmission={currentSubmission}
              setCurrentSubmission={setCurrentSubmission}
              setNotesMode={setNotesMode}
            />
          </ScrollArea>
        </div>
      </div>

      <SubmissionDetails
        submission={currentSubmission}
        notesMode={notesMode}
        setNotesMode={setNotesMode}
      />
    </div>
  );
}
