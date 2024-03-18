"use client";
import EmailTemplate from "@/email/template";

const submission = {
  id: "123",
  "service-info": {
    service: "meal-plan",
    "meal-plan": "10",
    venue: "home",
  },
  "contact-info": {
    name: "John Doe",
    phone: "123-456-7890",
    email: "johndoe@email.com",
  },
  "event-info": {
    address: "123 Main St",
    date: "2022-12-31",
    time: "12:00 PM",
  },
  "meal-plan-info": {
    age: "30",
    "height-ft": "5",
    "height-in": "10",
    weight: "150",
    goal: "lose",
    "activity-level": "active",
    activities: "running",
    allergies: "peanuts",
    fish: true,
    shrimp: true,
    chicken: true,
    beef: true,
    pork: true,
    turkey: true,
    lamb: true,
    "notice-confirmation": true,
  },
  "additional-info":
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  "checkout-link": "https://example.com/checkout",
};

export default function EmailPreview() {
  return <EmailTemplate submission={submission} />;
}
