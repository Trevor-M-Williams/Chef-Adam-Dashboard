import { cn } from "@/lib/utils";
import { Editor } from "novel";

export default function TextEditor({ content, handleUpdate, className }: any) {
  return (
    <Editor
      defaultValue={content}
      onDebouncedUpdate={handleUpdate}
      disableLocalStorage={true}
      className={cn("w-full h-full border-0", className)}
    />
  );
}
