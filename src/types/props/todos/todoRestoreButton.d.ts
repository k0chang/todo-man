import { Todo } from "../../data/firestore/todo";

export type TodoRestoreButtonT = {
  todo: Todo;
  onClose?: () => void;
};
