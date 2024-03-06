import { putForm } from "@/firebase/actions";

import { Input } from "@/components/ui/input";

export default function FormOptions({
  form,
  setForm,
}: {
  form: Form;
  setForm: (form: Form) => void;
}) {
  const updateForm = async () => {
    await putForm(form.id, form);
  };

  return (
    <div className="flex flex-col gap-4 py-4 px-2 gap-2">
      <div className="flex flex-col gap-1">
        <div className="font-medium">Title</div>
        <Input
          name="title"
          value={form.name}
          placeholder="Enter title"
          className="w-full"
          onChange={(e) => {
            setForm({
              ...form,
              name: e.target.value,
            });
          }}
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
          onBlur={updateForm}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="font-medium">Subtitle</div>
        <Input
          name="subtitle"
          value={form.subtitle}
          placeholder="Enter subtitle"
          className="w-full"
          onChange={(e) => {
            setForm({
              ...form,
              subtitle: e.target.value,
            });
          }}
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
          onBlur={updateForm}
        />
      </div>
    </div>
  );
}
