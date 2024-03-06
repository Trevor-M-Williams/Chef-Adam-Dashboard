import { getForm, postSubmission } from "@/firebase/actions";

import Form from "@/components/form";

export default async function PublicForm({
  searchParams,
}: {
  searchParams: { chefId: string; formId: string };
}) {
  const { chefId, formId } = searchParams;

  const formData = await getForm(chefId, formId);
  const form = {
    id: formId,
    ...formData,
  } as Form;
  const inputs: Input[] = form?.inputs;

  async function handleSubmit(userData: FormData) {
    "use server";

    if (!chefId || !formId) return;

    const formDataMap = new Map<string, FormDataEntryValue>(userData.entries());

    const data: { [key: string]: FormDataEntryValue | FormDataEntryValue[] } =
      {};

    formDataMap.forEach((value, key) => {
      if (key.startsWith("checkbox")) {
        const field = key.split("-")[1];

        if (Array.isArray(data[field])) {
          (data[field] as FormDataEntryValue[]).push(value);
        } else {
          data[field] = [value];
        }
      } else {
        data[key] = value;
      }
    });

    const submission = {
      formId,
      ...data,
    };

    await postSubmission(chefId, submission);
    // await sendNotificationEmail({ name: data.name, submission });
  }

  async function sendNotificationEmail({
    name,
    submission,
  }: {
    name: string;
    submission: string;
  }) {
    const res = await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({ name, submission }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }
  }

  if (!form || inputs.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-xl font-bold">
            Oops, looks like this form is missing.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Form form={form} formAction={handleSubmit} />
    </div>
  );
}
