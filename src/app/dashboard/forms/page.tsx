import Link from "next/link";

import { auth } from "@clerk/nextjs";

import { getForms, postForm } from "@/firebase/actions";

import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";

export default async function Forms() {
  const { userId }: { userId: string | null } = auth();
  if (!userId) return null;

  const forms = await getForms(userId);

  async function handleSubmit() {
    "use server";
    await postForm(userId as string);
  }

  return (
    <Container>
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between pb-4">
          <Title text="Forms" />
          <form action={handleSubmit}>
            <Button type="submit">New Form</Button>
          </form>
        </div>
        {forms
          .sort((a, b) => b.updatedAt - a.updatedAt)
          .map((form) => {
            const timestamp = new Date(
              parseInt(form.updatedAt)
            ).toLocaleDateString();

            return (
              <Link
                href={`/dashboard/forms/${form.id}`}
                key={form.id}
                className="w-full flex justify-between p-4 rounded text-lg border hover:bg-secondary"
              >
                <div>{form.name}</div>
                <div>{timestamp}</div>
              </Link>
            );
          })}
      </div>
    </Container>
  );
}
