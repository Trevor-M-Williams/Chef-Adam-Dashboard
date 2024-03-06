import Notes from "@/components/notes";
import Title from "@/components/title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch-lg";

import NotesIcon from "@mui/icons-material/TextSnippetOutlined";

export default function SubmissionsDetails({
  submission,
  notesMode,
  setNotesMode,
}: {
  submission: any;
  notesMode: boolean;
  setNotesMode: any;
}) {
  if (!submission) return null;

  const service = submission["service-info"].service;

  const contactName =
    submission["contact-info"].name || submission["contact-info"]["poc-name"];
  const contactPhone =
    submission["contact-info"].phone || submission["contact-info"]["poc-phone"];
  const contactEmail =
    submission["contact-info"].email || submission["contact-info"]["poc-email"];

  const eventAddress =
    submission["event-info"].address ||
    submission["event-info"]["marina-address"];
  const eventBoatName = submission["event-info"]["boat-name"];
  const eventPartySize = submission["event-info"]["party-size"];

  return (
    <div className="max-h-full flex flex-col p-6 overflow-auto">
      <div className="flex justify-between mb-4">
        <Title text={notesMode ? "Notes" : "Details"} />
      </div>

      <ScrollArea className="flex-grow">
        {submission && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-xl font-semibold">Contact Info</div>
              <div className="flex gap-2">
                <div className="font-semibold">Name:</div>
                {contactName}
              </div>
              <div className="flex gap-2">
                <div className="font-bold">Phone:</div>
                {contactPhone}
              </div>
              <div className="flex gap-2">
                <div className="font-bold">Email:</div>
                {contactEmail}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xl font-semibold">Service Info</div>
              <div className="flex gap-2">
                <div className="font-semibold">Service:</div>
                <div className="capitalize">{service.replaceAll("-", " ")}</div>
              </div>

              {service === "meal-plan" && (
                <div className="flex gap-2">
                  <div className="font-bold ">Plan:</div>
                  {submission["service-info"]["meal-plan"]}
                </div>
              )}
              {service !== "meal-plan" && (
                <div className="flex gap-2">
                  <div className="font-semibold">Venue:</div>
                  <div className="capitalize">
                    {submission["service-info"].venue}
                  </div>
                </div>
              )}
            </div>

            {service === "meal-plan" ? (
              <div className="space-y-2">
                <div className="text-xl font-semibold">Meal Plan Info</div>
                <div className="flex gap-2">
                  <div className="font-bold">Age:</div>
                  {submission["meal-plan-info"].age}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Height:</div>
                  {submission["meal-plan-info"]["height-ft"]}ft{" "}
                  {submission["meal-plan-info"]["height-in"]}in
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Weight:</div>
                  {submission["meal-plan-info"].weight}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold ">Goal:</div>
                  <div className="capitalize">
                    {submission["meal-plan-info"].goal.replaceAll("-", " ")}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Activity Level:</div>
                  {submission["meal-plan-info"]["activity-level"]}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Activities:</div>
                  {submission["meal-plan-info"].activities}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Allergies:</div>
                  {submission["meal-plan-info"].allergies}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Notice Confirmation:</div>
                  {submission["meal-plan-info"]["notice-confirmation"]
                    ? "Yes"
                    : "No"}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Fish:</div>
                  {submission["meal-plan-info"].fish ? "Yes" : "No"}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Shrimp:</div>
                  {submission["meal-plan-info"].shrimp ? "Yes" : "No"}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Chicken:</div>
                  {submission["meal-plan-info"].chicken ? "Yes" : "No"}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Beef:</div>
                  {submission["meal-plan-info"].beef ? "Yes" : "No"}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Pork:</div>
                  {submission["meal-plan-info"].pork ? "Yes" : "No"}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Turkey:</div>
                  {submission["meal-plan-info"].turkey ? "Yes" : "No"}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Lamb:</div>
                  {submission["meal-plan-info"].lamb ? "Yes" : "No"}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-xl font-semibold">Event Info</div>
                <div className="flex gap-2">
                  <div className="font-bold">Address:</div>
                  {eventAddress}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Date:</div>
                  {submission["event-info"]["date"]}
                </div>
                <div className="flex gap-2">
                  <div className="font-bold">Time:</div>
                  {submission["event-info"]["time"]}
                </div>
                {eventBoatName && (
                  <div className="flex gap-2">
                    <div className="font-bold">Boat Name:</div>
                    {eventBoatName}
                  </div>
                )}
                {eventPartySize && (
                  <div className="flex gap-2">
                    <div className="font-bold">Party Size:</div>
                    {eventPartySize}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <div className="text-xl font-semibold">Additional Info</div>
              {submission["additional-info"] || "None"}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
