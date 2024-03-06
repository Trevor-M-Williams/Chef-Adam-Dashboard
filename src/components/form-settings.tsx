import { useState } from "react";

import FieldOptions from "@/components/form-settings/field-options";
import FormOptions from "@/components/form-settings/form-options";
import DesignOptions from "@/components/form-settings/design-options";
import SubmitOptions from "@/components/form-settings/submit-options";
import ShareOptions from "@/components/form-settings/share-options";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

import FormIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FieldsIcon from "@mui/icons-material/Menu";
import DesignIcon from "@mui/icons-material/DesignServices";
import SubmitIcon from "@mui/icons-material/SendRounded";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/CloseRounded";
import EditIcon from "@mui/icons-material/EditNote";

import { cn } from "@/lib/utils";

export default function FormSettings({
  form,
  setForm,
}: {
  form: Form;
  setForm: (form: Form) => void;
}) {
  const [settingsOpen, setSettingsOpen] = useState(true);

  return (
    <div
      className={cn(
        "absolute z-10 h-full w-full bg-white transition-all sm:static sm:w-[32rem]",
        !settingsOpen && "w-0"
      )}
    >
      <div className="flex justify-end pr-3 pt-4 pb-2 sm:hidden">
        <CloseIcon
          onClick={() => {
            setSettingsOpen(false);
          }}
        />
      </div>

      {!settingsOpen && (
        <EditIcon
          className="absolute top-4 left-3"
          onClick={() => {
            setSettingsOpen(true);
          }}
        />
      )}

      <ScrollArea className="h-full">
        <Accordion type="single" collapsible>
          <AccordionItem value="form">
            <AccordionTrigger>
              <div className="flex items-center">
                <FormIcon fontSize={"small"} className="mr-2" />
                <div className="font-medium">Form</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <FormOptions form={form} setForm={setForm} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fields">
            <AccordionTrigger>
              <div className="flex items-center">
                <FieldsIcon fontSize={"small"} className="mr-2" />
                <div className="font-medium">Fields</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <FieldOptions form={form} setForm={setForm} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="design">
            <AccordionTrigger>
              <div className="flex items-center">
                <DesignIcon fontSize={"small"} className="mr-2" />
                <div className="font-medium">Design</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <DesignOptions form={form} setForm={setForm} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="submit">
            <AccordionTrigger>
              <div className="flex items-center">
                <SubmitIcon fontSize={"small"} className="mr-2" />
                <div className="font-medium">Submit</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <SubmitOptions form={form} setForm={setForm} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="share">
            <AccordionTrigger>
              <div className="flex items-center">
                <ShareIcon fontSize={"small"} className="mr-2" />
                <div className="font-medium">Share</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ShareOptions form={form} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  );
}
