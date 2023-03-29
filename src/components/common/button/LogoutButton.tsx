import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../lib/firebase";
import { CommonButton } from "../../../types/props/common/button";
import { useViewTransition } from "../../../utils/transition/useViewTransition";

export function LogoutButton({ show }: CommonButton) {
  const [error, setError] = useState("");
  const viewTransition = useViewTransition();
  const handleLogout = () => {
    setError("");
    signOut(auth)
      .then(() => viewTransition("/"))
      .catch(() => setError("Logout failed for some reason."));
  };
  return (
    <>
      {!!error ? (
        <p>{error}</p>
      ) : (
        <button
          className={`${
            !show ? "hidden" : ""
          } absolute right-0 mr-5 p-3 border-[var(--font)] border-2`}
          onClick={handleLogout}>
          Logout
        </button>
      )}
    </>
  );
}
