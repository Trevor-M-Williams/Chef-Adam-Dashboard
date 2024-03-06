"use client";
import { useState, useEffect } from "react";

import { useAuth } from "@clerk/nextjs";

import { getSubmissions, getForms } from "@/firebase/actions";

import SubmissionsTable from "@/components/submissions-table";
import SubmissionDetails from "@/components/submission-details";
import Title from "@/components/title";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Submissions() {
  const [submissions, setSubmissions] = useState<any>(null);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [notesMode, setNotesMode] = useState(false);

  const { userId } = useAuth();
  const chefId = userId;

  useEffect(() => {
    async function getData() {
      if (!chefId) return;

      const forms = await getForms(chefId);
      if (!forms) return;

      const formDetailsMap = new Map(
        forms.map((form) => [form.id, { name: form.name, inputs: form.inputs }])
      );

      const submissionsData = await getSubmissions();
      if (!submissionsData) return;

      const submissions = submissionsData.map((submission) => ({
        ...submission,
        id: submission.id,
        formName: formDetailsMap.get(submission.formId)?.name || "Unknown",
        formInputs: formDetailsMap.get(submission.formId)?.inputs || [],
      }));

      const sortedSubmissions = [...submissions].sort((a, b) => {
        return parseInt(b.submittedAt) - parseInt(a.submittedAt);
      });
      setSubmissions(sortedSubmissions);
      setCurrentSubmission(sortedSubmissions[0]);
    }

    getData();
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
