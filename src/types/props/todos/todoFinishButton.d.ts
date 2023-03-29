import { Todo } from "../../data/firestore/todo";

export type TodoFinishButtonT = {
  todo: Todo;
  onClose?: () => void;
};
