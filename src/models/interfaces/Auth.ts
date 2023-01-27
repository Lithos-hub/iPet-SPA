import { User } from "./User";

export interface Auth {
  data: {
    user: User;
    token: string;
  };
}
