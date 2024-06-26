import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Menu from "../menu/Menu";
import LoginButton from "./button/LoginButton";
import { LogoutButton } from "./button/LogoutButton";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { user } = useAuthContext();

  return (
    <>
      <div className={`menu z-10 relative mt-8 h-[120px] w-full flex`}>
        <Menu user={user} />
        <LogoutButton
          show={
            !!user || !["/", "/signup", "/forgot", "/exit"].includes(pathname)
          }
        />
        <LoginButton show={!!!user} />
      </div>
      <div className='bodie w-full h-screen flex justify-center items-center mb-[180px]'>
        <div className='w-[80%] max-w-[680px] h-full'>{children}</div>
      </div>
    </>
  );
}
