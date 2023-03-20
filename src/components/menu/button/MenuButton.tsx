import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

interface MenuButton {
  user: User | null | undefined;
  menuOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
}

export default function MenuButton({
  user,
  menuOpenState: [isMenuOpen, setIsMenuOpen],
}: MenuButton) {
  return (
    <button
      className={`mt-3 ml-8 relative ${
        !user && "hidden"
      } w-[40px] h-[40px] bg-[var(--font)] rounded-full before:content-[''] before:rounded-full before:w-[25px] before:h-[25px] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:bg-[var(--bgcolor)] before:block before:scale-0 before:transition-all before:duration-100 before:origin-center ${
        isMenuOpen ? "before:scale-100" : ""
      }`}
      onClick={() => setIsMenuOpen(p => !p)}
    />
  );
}
