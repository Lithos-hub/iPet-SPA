export interface Pet {
  name: string;
  sex: string;
  weight: number;
  weight_measure: "kg" | "lbs";
  birthday: number;
  breed: string;
  specie: "dog" | "cat";
  color: string;
  userId: string;
  imageUrl?: string;
  allergies: string[];
  spaying_status: boolean;
}

export interface Pet_Backend extends Pet {
  id: string | number;
  createdAt: string;
  updatedAt?: string;
}
export interface Pet_Actions extends Pet_Backend {
  onEdit: Function;
  onDelete: Function;
  onSeeDetails: Function;
}
