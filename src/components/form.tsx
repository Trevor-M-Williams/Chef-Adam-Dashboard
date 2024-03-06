import Title from "@/components/title";

import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/date-picker";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SubmitButton } from "./submit-button";

export default function Form({
  form,
  formAction = async (userData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

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

    console.log(data);
  },
}: {
  form: Form;
  formAction?: (userData: FormData) => void;
}) {
  const inputs = form.inputs;

  const formInputClass = "h-12";

  return (
    <div
      className={cn("h-full w-full flex items-center justify-center")}
      style={{
        backgroundColor: form.bgColor,
      }}
    >
      <ScrollArea className="h-full w-full">
        <div className="w-full max-w-lg flex flex-col mx-auto my-16 px-4">
          <div className="mb-4">
            <Title text={form.name} className="text-3xl mb-2" />
            <div className="">{form.subtitle}</div>
          </div>

          <form action={formAction} className="flex flex-col gap-6">
            {inputs.map((input, index) => {
              return (
                <div key={index}>
                  <div className=" font-semibold mb-1">
                    {input.name}
                    {input.type !== "multi-select" && input.required
                      ? " *"
                      : ""}
                  </div>

                  {input.caption && (
                    <div className="text-xs font-medium mb-4">
                      {input.caption}
                    </div>
                  )}

                  {(function renderInput(input) {
                    switch (input.type) {
                      case "checkbox":
                        return (
                          <Checkbox
                            name={input.name}
                            required={input.required}
                          />
                        );

                      case "date":
                        return (
                          <DatePicker
                            name={input.name}
                            required={input.required}
                            className={formInputClass}
                          />
                        );

                      case "phone":
                        return (
                          <Input
                            name={input.name}
                            type={input.type}
                            placeholder={input.name}
                            className={formInputClass}
                            minLength={10}
                            maxLength={10}
                          />
                        );

                      case "multi-select":
                        return (
                          <div>
                            {input.options?.map((option, index) => {
                              if (!option) return null;
                              return (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 mb-1"
                                >
                                  <Checkbox
                                    id={`${input.name}-${option}`}
                                    name={`checkbox-${input.name}-${option}`}
                                    value={option}
                                  />
                                  <label htmlFor={`${input.name}-${option}`}>
                                    {option}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        );

                      case "select":
                        return (
                          <Select name={input.name} required={input.required}>
                            <SelectTrigger
                              className={formInputClass}
                              style={{
                                backgroundColor: "white !important",
                              }}
                            >
                              <SelectValue placeholder={input.name} />
                            </SelectTrigger>
                            <SelectContent>
                              {input.options?.map((option) => {
                                if (!option) return null;
                                return (
                                  <SelectItem
                                    key={option}
                                    value={option}
                                    className={formInputClass}
                                  >
                                    {option}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        );

                      case "textarea":
                        return (
                          <Textarea
                            name={input.name}
                            placeholder={input.name}
                            required={input.required}
                            className={formInputClass}
                          />
                        );

                      case "time":
                        return (
                          <Input
                            name={input.name}
                            type={input.type}
                            placeholder={input.name}
                            required={input.required}
                            className={formInputClass}
                          />
                        );

                      default:
                        return (
                          <Input
                            name={input.name}
                            type={input.type}
                            placeholder={input.name}
                            required={input.required}
                            className={formInputClass}
                          />
                        );
                    }
                  })(input)}
                </div>
              );
            })}

            <SubmitButton />
          </form>
        </div>
      </ScrollArea>
    </div>
  );
}
