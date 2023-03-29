import { Todo } from "../../data/firestore/todo";

export type UnfinishedTodoStatusT = {
  todo: Todo;
  onClick: () => void;
};
