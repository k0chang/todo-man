import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((e: FirebaseError) => console.error(e.message));
  };

  return (
    <>
      <div
        className={`mt-8 h-[40px] w-full ${
          (pathname === "/" || pathname === "/signup") && "hidden"
        }`}>
        <button
          className={`absolute right-0 mr-3 w-[80px] py-3 border-[var(--font)] border-2`}
          onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='w-[80%] max-w-[480px] h-auto'>{children}</div>
      </div>
    </>
  );
}
