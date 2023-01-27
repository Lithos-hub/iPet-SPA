export interface Contact {
  name: string;
}

export interface Contact_Backend extends Contact {
  _id: string;
  name: string;
  contact_phone: string;
  contact_phone_2: string;
  city: string;
  email: string;
}
