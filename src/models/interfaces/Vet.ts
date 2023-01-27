export interface Vet {
  name: string;
  contact_phone: string;
  emergency_phone: string;
  city: string;
  userId: string;
}

export interface Vet_Backend extends Vet {
  id: string | number;
  createdAt: string;
  updatedAt?: string;
}
