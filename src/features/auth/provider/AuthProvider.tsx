import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../../../lib/firebase";
import { AuthState } from "../../../types/firebase";

export const AuthContext = createContext<AuthState>({ user: null });

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<AuthState>({ user: null });

  useEffect(() => {
    onAuthStateChanged(auth, usr => {
      if (usr) {
        setLoggedInUser({ user: usr });
      } else {
        setLoggedInUser({ user: null });
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={loggedInUser}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
