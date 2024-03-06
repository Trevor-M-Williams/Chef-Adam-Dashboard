import { useState, useEffect, useCallback } from "react";
import { putForm } from "@/firebase/actions";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";

export default function DesignOptions({
  form,
  setForm,
}: {
  form: Form;
  setForm: (form: Form) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [debouncedColor, setDebouncedColor] = useState(form.bgColor);
  const formId = form.id;

  const debouncedPutForm = useCallback(
    debounce((formId: string, newForm: Form) => {
      putForm(formId, newForm);
    }, 500),
    []
  );

  function handleColorChange(newColor: string) {
    const newForm = { ...form, bgColor: newColor };
    setForm(newForm);
    setDebouncedColor(newColor);
  }

  useEffect(() => {
    const newForm = { ...form, bgColor: debouncedColor };
    debouncedPutForm(formId, newForm);
  }, [debouncedColor, debouncedPutForm, formId, form]);

  function handleInputClick() {
    setShowPicker(!showPicker);
  }

  useEffect(() => {
    const closePicker = (e: any) => {
      if (!e.target.closest("#color-picker-container")) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", closePicker);
    return () => document.removeEventListener("mousedown", closePicker);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="">Background Color: </div>
        <div
          className={cn("h-8 w-8 rounded border")}
          style={{ backgroundColor: form.bgColor }}
          onClick={handleInputClick}
        ></div>
      </div>
      {showPicker && (
        <div className="flex justify-end">
          <HexColorPicker
            id="color-picker-container"
            style={{
              position: "absolute",
              transform: "translateY(0.5rem)",
              zIndex: 1000,
            }}
            color={form.bgColor}
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
}

function debounce<F extends (...args: any[]) => void>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout | null;

  return function executedFunction(...args: Parameters<F>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
