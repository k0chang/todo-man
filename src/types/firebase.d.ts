import { User } from "firebase/auth";

export type AuthState = { user: User | null };

export type Todo = {
  id?: string;
  name?: string;
  done?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
