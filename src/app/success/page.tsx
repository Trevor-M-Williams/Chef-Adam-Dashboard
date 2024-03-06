import { getForm } from "@/firebase/actions";

export default async function PublicForm({
  searchParams,
}: {
  searchParams: { chefId: string; formId: string };
}) {
  const { chefId, formId } = searchParams;

  const formData = await getForm(chefId, formId);
  const submitMessage = formData?.submitMessage;

  return (
    <div className="h-screen w-full flex items-center justify-center bg-secondary">
      <div className="text-2xl font-semibold">{submitMessage}</div>
    </div>
  );
}
