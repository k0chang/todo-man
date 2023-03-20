import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../features/auth/provider/AuthProvider";
import MenuButton from "../menu/button/MenuButton";
import MenuContents from "../menu/contents/MenuContents";
import { LoginButton, LogoutButton } from "./button/Button";

export default function Layout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuthContext();

  return (
    <>
      <div className={`relative mt-8 h-[120px] w-full flex`}>
        <MenuButton user={user} menuOpenState={[isMenuOpen, setIsMenuOpen]} />
        <MenuContents user={user} open={isMenuOpen} />
        <LogoutButton show={!!user || !["/", "/signup"].includes(pathname)} />
        <LoginButton show={!!!user} />
      </div>
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='w-[80%] max-w-[680px] h-full mb-10'>{children}</div>
      </div>
    </>
  );
}
