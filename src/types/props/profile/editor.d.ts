import { UseStateType } from "../../hooks/useState";

export type EditorT = {
  usernameState: UseStateType<string>;
  editorOpenState: UseStateType<boolean>;
  warnState: UseStateType<string>;
};
