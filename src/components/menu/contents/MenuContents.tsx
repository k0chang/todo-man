import { User } from "firebase/auth";

interface MenuContents {
  user: User | null | undefined;
  open: boolean;
}

export default function MenuContents({ user, open }: MenuContents) {
  return (
    <div
      className={`absolute top-[70px] left-9 px-5 text-[var(--bgcolor)] bg-[#29fff1ed] border-[var(--font)] border-l-2 ${
        open
          ? "visible opacity-100 translate-y-0 scale-y-[100%]"
          : "invisible opacity-0 -translate-y-[50%] scale-y-[50%]"
      } transition-all duration-200`}>
      <p className='py-3'>{user?.displayName || user?.email || ""}</p>
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
  );
}
