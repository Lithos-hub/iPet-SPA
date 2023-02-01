import { CalendarEvent, CalendarEvent_Backend } from "./CalendarEvent";
import { Contact_Backend } from "./Contact";
import { Pet_Backend } from "./Pet";
import { Vet_Backend } from "./Vet";

export interface User {
  _id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  pets: Pet_Backend[];
  events: CalendarEvent_Backend[];
  vets: Vet_Backend[];
  contacts: Contact_Backend[];
  notes: any[];
}

export interface UserLogin {
  email: string;
  password: string;
}
