"use client";
import { useState, useEffect } from "react";

import SubmissionsTable from "@/components/submissions-table";
import SubmissionDetails from "@/components/submission-details";
import Title from "@/components/title";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Submissions() {
  // const [submissions, setSubmissions] = useState<any>(null);
  const submissions = [
    {
      "meal-plan-info": {
        age: "1",
        "height-ft": "1",
        "height-in": "1",
        weight: "1",
        goal: "weight-maintain",
        "activity-level": "light",
        activities: "Sports",
        allergies: "",
        fish: false,
        shrimp: false,
        chicken: false,
        beef: false,
        pork: false,
        turkey: true,
        lamb: false,
        "notice-confirmation": true,
      },
      "contact-info": { name: "John Doe", phone: "1234567890", email: "m@x" },
      "event-info": {},
      "service-info": { service: "meal-plan", venue: "", "meal-plan": "10" },
      "additional-info": "",
      "checkout-link": "https://buy.stripe.com/3cs6pl4Gl1Qg0BW00t",
    },
  ];
  const [currentSubmission, setCurrentSubmission] = useState(submissions[0]);
  const [notesMode, setNotesMode] = useState(false);

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
