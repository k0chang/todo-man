import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth/authContext";
import { auth } from "../../../lib/firebase";
import { AuthState } from "../../../types/contexts/auth/authState";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState>({ user: null });

  useEffect(() => {
    onAuthStateChanged(auth, usr => {
      if (usr) {
        setUser({ user: usr });
      } else {
        setUser({ user: null });
      }
    });
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
