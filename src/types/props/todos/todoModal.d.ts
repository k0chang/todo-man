import { Todo } from "../../data/firestore/todo";

export type TodoModalT = {
  todo: Todo;
  open: boolean;
  onClose?: () => void;
  status: "finished" | "yet";
};
