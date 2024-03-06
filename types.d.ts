type Form = {
  id: string;
  name: string;
  subtitle: string;
  inputs: Input[];
  submitMessage: string;
  bgColor: string;
};

type Input = {
  name: string;
  type: InputType;
  required: boolean;
  caption?: string;
  options?: string[];
};

type InputType =
  | "checkbox"
  | "date"
  | "email"
  | "multi-select"
  | "number"
  | "phone"
  | "select"
  | "text"
  | "textarea"
  | "time";
