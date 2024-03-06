"use client";
import { useState, useEffect } from "react";

import { useAuth } from "@clerk/nextjs";

import { getForm } from "@/firebase/actions";

import Form from "@/components/form";
import FormSettings from "@/components/form-settings";

export default function FormEditor({ params }: { params: { formId: string } }) {
  const { formId } = params;
  const { userId } = useAuth();

  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      if (!userId || !formId) return;

      const formData = await getForm(userId, formId);

      if (!formData) return;

      const form = {
        id: formId,
        ...formData,
      } as Form;

      setForm(form);
      setLoading(false);
    }

    getData();
  }, [userId, formId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-xl font-bold">
            Oops, looks like this form is missing.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex">
      <FormSettings form={form} setForm={setForm} />
      <Form form={form} />
    </div>
  );
}
