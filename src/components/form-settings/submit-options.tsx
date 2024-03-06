import { putForm } from "@/firebase/actions";
import { Textarea } from "../ui/textarea";

export default function SubmitOptions({
  form,
  setForm,
}: {
  form: Form;
  setForm: (form: Form) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      submitMessage: e.target.value,
    });
  };

  const updateForm = async () => {
    await putForm(form.id, form);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="font-medium">Submit Message</div>
        <Textarea
          className="w-full"
          value={form.submitMessage}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
          onBlur={updateForm}
        />
      </div>
    </div>
  );
}
