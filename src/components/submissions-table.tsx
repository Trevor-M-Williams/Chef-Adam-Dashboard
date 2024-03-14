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
          <TableHead className="">Name</TableHead>
          <TableHead className="">Service</TableHead>
          <TableHead className="text-right">Submitted At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions
          .filter(
            (submission: any) =>
              submission["contact-info"].name !== "test" &&
              submission["contact-info"]["poc-name"] !== "test"
          )
          .sort((a: Submission, b: Submission) => {
            return parseInt(b.id) - parseInt(a.id);
          })
          .map((submission: any, index: number) => {
            const contactName =
              submission["contact-info"].name ||
              submission["contact-info"]["poc-name"];
            const service = submission["service-info"].service || "N/A";
            const submittedAt = new Date(
              parseInt(submission.id)
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
                <TableCell>{contactName}</TableCell>
                <TableCell className="capitalize">
                  {service.replaceAll("-", " ")}
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
