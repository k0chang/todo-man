import { Dispatch, SetStateAction } from "react";
import { Todo } from "../../data/firestore/todo";

export type NewTaskFormT = {
  setWarn: Dispatch<SetStateAction<string | null>>;
  todos: Todo[];
};
