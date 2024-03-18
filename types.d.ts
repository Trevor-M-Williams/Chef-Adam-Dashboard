type Submission = {
  id: string;
  "meal-plan-info": {
    age?: string;
    "height-ft"?: string;
    "height-in"?: string;
    weight?: string;
    goal?: string;
    "activity-level"?: string;
    activities?: string;
    allergies?: string;
    fish?: boolean;
    shrimp?: boolean;
    chicken?: boolean;
    beef?: boolean;
    pork?: boolean;
    turkey?: boolean;
    lamb?: boolean;
    "notice-confirmation"?: boolean;
  };
  "contact-info": {
    name?: string;
    phone?: string;
    email: string;
    "poc-name"?: string;
    "poc-phone"?: string;
  };
  "event-info": {
    address?: string;
    date?: string;
    time?: string;
    "boat-name"?: string;
    "marina-address"?: string;
    "party-size"?: string;
  };
  "service-info": {
    service: string;
    venue?: string;
    "meal-plan"?: string;
  };
  "additional-info"?: string;
  "checkout-link": string;
};
