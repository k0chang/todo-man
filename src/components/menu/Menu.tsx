import { useState } from "react";
import { AuthState } from "../../types/contexts/auth/authState";
import MenuButton from "./button/MenuButton";

export default function Menu({ user }: AuthState) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <MenuButton user={user} menuOpenState={[isMenuOpen, setIsMenuOpen]} />
      <div
        className={`absolute top-[70px] left-9 px-5 text-[var(--bgcolor)] bg-[#29fff1ed] border-[var(--font)] border-l-2 ${
          isMenuOpen
            ? "visible opacity-100 translate-y-0 scale-y-[100%]"
            : "invisible opacity-0 -translate-y-[50%] scale-y-[50%]"
        } transition-all duration-200`}>
        <p className='py-3'>{user?.displayName || user?.email || "User"}</p>
        <div className='border-transparent'>
          <div className='my-6'>
            <a
              className='border-transparent border-b-2 hover:border-[var(--font)] transition-all duration-200'
              href='/todos/profile'>
              Profile
            </a>
          </div>
          <div className='my-4'>
            <a
              className='border-transparent border-b-2 hover:border-[var(--font)] transition-all duration-200'
              href='/todos'>
              TODO Man
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
