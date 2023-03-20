import { AuthState } from "../../contexts/auth/authState";
import { UseStateType } from "../../state";

export type MenuButtonT = AuthState & {
  menuOpenState: UseStateType<boolean>;
};
