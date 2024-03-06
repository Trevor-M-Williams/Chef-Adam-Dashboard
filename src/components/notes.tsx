import { useState, useEffect } from "react";

import TextEditor from "@/components/text-editor";

export default function Notes({ id }: { id: string }) {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);

  async function handleUpdate(editor: any) {
    const content = editor.getJSON();
    try {
      const res = await fetch(`/api/notes`, {
        method: "POST",
        body: JSON.stringify({ id, content }),
      });
      const json = await res.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) return null;

  return (
    <TextEditor
      content={content || ""}
      handleUpdate={handleUpdate}
      className="h-full w-full"
    />
  );
}
