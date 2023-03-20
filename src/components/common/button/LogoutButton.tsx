import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../lib/firebase";
import { CommonButton } from "../../../types/props/common/button";

export function LogoutButton({ show }: CommonButton) {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    setError("");
    signOut(auth)
      .then(() => navigate("/"))
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
          } absolute right-0 mr-3 w-[80px] py-3 border-[var(--font)] border-2`}
          onClick={handleLogout}>
          Logout
        </button>
      )}
    </>
  );
}
