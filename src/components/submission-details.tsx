import Notes from "@/components/notes";
import Title from "@/components/title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch-lg";

import NotesIcon from "@mui/icons-material/TextSnippetOutlined";

export default function SubmissionsDetails({
  submission,
  notesMode,
  setNotesMode,
}: {
  submission: any;
  notesMode: boolean;
  setNotesMode: any;
}) {
  return (
    <div className="max-h-full flex flex-col pt-6 overflow-auto">
      <div className="flex justify-between mb-4 px-6">
        <Title text={notesMode ? "Notes" : "Details"} />
        <div className="flex gap-2">
          <NotesIcon />
          <Switch
            checked={notesMode}
            onCheckedChange={() => setNotesMode(!notesMode)}
          />
        </div>
      </div>

      <ScrollArea className="flex-grow px-6 ">
        {submission &&
          (notesMode ? (
            <Notes id={submission.id} />
          ) : (
            submission.formInputs.map((input: any, index: number) => {
              let value = submission[input.name] || "N/A";
              if (Array.isArray(value)) value = value.join(", ");
              return (
                <div key={index} className="flex flex-col mb-4">
                  <div className="shrink-0 text-sm font-semibold mb-1">
                    {input.name}
                  </div>
                  <div className="">{value}</div>
                </div>
              );
            })
          ))}
      </ScrollArea>
    </div>
  );
}
