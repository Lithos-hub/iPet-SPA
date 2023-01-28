export interface Note {
  description: string;
}

export interface Note_Backend extends Note {
  _id: string;
  createdAt: string;
  updatedAt?: string;
}
