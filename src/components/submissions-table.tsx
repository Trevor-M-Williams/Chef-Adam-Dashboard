import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SubmissionsTable({
  submissions,
  currentSubmission,
  setCurrentSubmission,
  setNotesMode,
}: {
  submissions: any;
  currentSubmission: any;
  setCurrentSubmission: any;
  setNotesMode: any;
}) {
  function handleSelection(submission: any) {
    setCurrentSubmission(submission);
    setNotesMode(false);
  }

  if (!submissions) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Form</TableHead>
          <TableHead className="text-right">Submitted At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission: any, index: number) => {
          const submittedAt = new Date(
            parseInt(submission.submittedAt)
          ).toLocaleString();

          return (
            <TableRow
              key={index}
              className={cn(
                "font-medium cursor-pointer hover:bg-secondary",
                currentSubmission.id === submission.id ? "bg-secondary" : ""
              )}
              onClick={() => handleSelection(submission)}
            >
              <TableCell>
                <Link href={`/dashboard/forms/${submission.formId}`}>
                  <Button variant={"ghost"} className="px-1 hover:bg-slate-200">
                    {submission.formName}
                  </Button>
                </Link>
              </TableCell>
              <TableCell className="text-right">{submittedAt}</TableCell>
            </TableRow>
          );
        })}

        {submissions?.length === 0 && (
          <TableRow>
            <TableCell className="text-center" colSpan={3}>
              No submissions yet
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
