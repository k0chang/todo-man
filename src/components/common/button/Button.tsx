import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../lib/firebase";

interface Button {
  show: boolean;
}

export function LogoutButton({ show }: Button) {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((e: FirebaseError) => console.error(e.message));
  };
  return (
    <button
      className={`${
        !show ? "hidden" : ""
      } absolute right-0 mr-3 w-[80px] py-3 border-[var(--font)] border-2`}
      onClick={handleLogout}>
      Logout
    </button>
  );
}

export function LoginButton({ show }: Button) {
  const navigate = useNavigate();

  return (
    <button
      className={`${
        !show ? "hidden" : ""
      } absolute right-0 mr-3 w-[80px] py-3 border-[var(--font)] border-2`}
      onClick={() => navigate("/")}>
      Login
    </button>
  );
}
