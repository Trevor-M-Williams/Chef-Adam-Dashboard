import { useState, useEffect } from "react";

import { putForm } from "@/firebase/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";

export default function FieldOptions({
  form,
  setForm,
}: {
  form: Form;
  setForm: (form: Form) => void;
}) {
  const [changes, setChanges] = useState(false);

  const inputs = form.inputs;

  const inputOptions = [
    "checkbox",
    "date",
    "email",
    "multi-select",
    "number",
    "phone",
    "select",
    "text",
    "textarea",
    "time",
  ];

  const handleAddInput = () => {
    let newInputs = [...inputs];
    newInputs.push({ name: "", type: "text", required: true });
    setForm({ ...form, inputs: newInputs });
  };

  const handleAddOption = (index: number) => {
    const newInputs = [...inputs];
    const options = newInputs[index].options;
    if (options) options.push("");
    else newInputs[index].options = [""];
    setForm({ ...form, inputs: newInputs });
  };

  const handleInputChange = <K extends keyof Input>(
    index: number,
    key: K,
    value: Input[K]
  ) => {
    const newInputs = [...inputs];
    newInputs[index] = { ...newInputs[index], [key]: value };
    setForm({ ...form, inputs: newInputs });
    setChanges(true);
  };

  const handleOptionChange = (
    inputIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newInputs = [...inputs];
    const options = newInputs[inputIndex].options;
    if (options) options[optionIndex] = value;
    setForm({ ...form, inputs: newInputs });
    setChanges(true);
  };

  const handleSelectChange = (index: number, value: InputType) => {
    const newInputs = [...inputs];
    newInputs[index] = { ...newInputs[index], type: value };
    if (!value?.includes("select")) delete newInputs[index].options;
    setForm({ ...form, inputs: newInputs });
    setChanges(true);
  };

  const handleDeleteInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setForm({ ...form, inputs: newInputs });
    setChanges(true);
  };

  const removeOption = (inputIndex: number, optionIndex: number) => {
    const newInputs = [...inputs];
    const options = newInputs[inputIndex].options;
    if (options) options.splice(optionIndex, 1);
    setForm({ ...form, inputs: newInputs });
    setChanges(true);
  };

  const updateForm = async () => {
    if (!changes) return;
    await putForm(form.id, form);
    setChanges(false);
  };

  useEffect(() => {
    updateForm();
  }, [changes]);

  return (
    <>
      {inputs.map((input, index) => (
        <div key={index} className="flex flex-col gap-4 py-4 border-b-2">
          {input.type !== "multi-select" && (
            <div className="flex gap-4">
              <div className="font-medium">Required</div>
              <Switch
                defaultChecked={input.required}
                onCheckedChange={(e) => handleInputChange(index, "required", e)}
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <div className="font-medium">Title</div>
            <Input
              value={input.name}
              placeholder="Enter title"
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
              onBlur={updateForm}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-medium">Type</div>
            <Select
              key={index}
              onValueChange={(value: InputType) =>
                handleSelectChange(index, value)
              }
            >
              <SelectTrigger className="capitalize">
                <SelectValue placeholder={input.type} />
              </SelectTrigger>
              <SelectContent defaultValue={input.type}>
                {inputOptions?.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="capitalize"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-medium">Caption</div>
            <Input
              value={input.caption}
              placeholder="Enter caption (optional)"
              onChange={(e) =>
                handleInputChange(index, "caption", e.target.value)
              }
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
              onBlur={updateForm}
            />
          </div>

          {input.type.includes("select") && (
            <div className="flex flex-col gap-1">
              <div className="font-medium">Options</div>
              {input.options?.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="relative flex items-center group"
                >
                  <Input
                    value={option}
                    placeholder="Enter option"
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && e.currentTarget.blur()
                    }
                    onBlur={updateForm}
                  />

                  <RemoveIcon
                    fontSize={"small"}
                    className="text-red-500 absolute right-1 cursor-pointer invisible group-hover:visible"
                    onClick={() => removeOption(index, optionIndex)}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between">
            {input.type.includes("select") ? (
              <Button
                variant={"outline"}
                size={"icon"}
                className="self-end"
                onClick={() => handleAddOption(index)}
              >
                <AddIcon fontSize={"small"} />
              </Button>
            ) : (
              <div className=""></div>
            )}

            <Button
              variant={"outline"}
              size={"icon"}
              className="self-end"
              onClick={() => handleDeleteInput(index)}
            >
              <DeleteIcon fontSize={"small"} className="text-red-500" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        variant={"default"}
        onClick={handleAddInput}
        className="w-full mt-4"
      >
        Add Input
      </Button>
    </>
  );
}
