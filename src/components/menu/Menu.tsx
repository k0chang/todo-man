import { useState } from "react";
import { AuthState } from "../../types/contexts/auth/authState";
import { useViewTransition } from "../../utils/transition/useViewTransition";
import MenuButton from "./button/MenuButton";

export default function Menu({ user }: AuthState) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const viewTransition = useViewTransition();

  return (
    <div className={`${!!user ? "" : "hidden"} flex`}>
      <MenuButton user={user} menuOpenState={[isMenuOpen, setIsMenuOpen]} />
      <div
        className={`absolute top-[70px] left-9 px-5 text-[var(--bgcolor)] bg-[#29fff1ed] border-[var(--font)] border-l-2 ${
          isMenuOpen
            ? "visible opacity-100 translate-y-0 scale-y-[100%]"
            : "invisible opacity-0 -translate-y-[50%] scale-y-[50%]"
        } transition-all duration-200`}>
        <div className='border-transparent flex flex-col justify-start'>
          <button
            className='py-5 border-transparent border-b-2 hover:border-[var(--font)] transition-all duration-200 text-left'
            onClick={() => viewTransition("/todos/profile")}>
            Profile
          </button>
          <button
            className='py-5 border-transparent border-b-2 hover:border-[var(--font)] transition-all duration-200 text-left'
            onClick={() => viewTransition("/todos")}>
            TODO Manager
          </button>
        </div>
      </div>
      <p className='py-5 ml-4'>{user?.displayName || user?.email || "User"}</p>
    </div>
  );
}
