import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../../../lib/firebase";

export type AuthState = { user: User | null | undefined };

export const AuthContext = createContext<AuthState>({ user: undefined });

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState>({ user: undefined });

  useEffect(() => {
    onAuthStateChanged(auth, usr => {
      if (usr) {
        setUser({ user: usr });
      } else {
        return;
      }
    });
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
