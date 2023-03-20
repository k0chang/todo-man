import { Timestamp } from "firebase/firestore";

export type Todo = {
  id?: string;
  name?: string;
  done?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
