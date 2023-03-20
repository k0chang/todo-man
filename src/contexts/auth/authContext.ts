import { createContext } from "react";
import { AuthState } from "../../types/contexts/auth/authState";

export const AuthContext = createContext<AuthState>({ user: null });
