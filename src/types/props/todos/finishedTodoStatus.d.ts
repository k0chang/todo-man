import { Todo } from "../../data/firestore/todo";

export type FinishedTodoStatusT = {
  todo: Todo;
  onClick?: () => void;
};
