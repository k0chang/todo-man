import {
  faEnvelope,
  faHandPointLeft,
  faPenToSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AccountDeleteModal from "../components/profile/AccountDeleteModal";
import Editor from "../components/profile/Editor";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Profile() {
  const { user } = useAuthContext();
  const [username, setUsername] = useState(user?.displayName ?? "");
  const [warn, setWarn] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] =
    useState(false);

  useEffect(() => {
    setUsername(user?.displayName ?? "");
  }, [user?.displayName]);

  const handleOpen = () => {
    setWarn("");
    setIsEditorOpen(true);
  };

  if (!user) {
    return <h2>To manage tasks, first log in!</h2>;
  }
  return (
    <>
      <h1>Profile</h1>
      <ul className='mt-10 mb-10'>
        <li className='flex justify-between py-3'>
          <div className='flex'>
            <FontAwesomeIcon icon={faUser} className='mr-2' />
            <p>User name</p>
          </div>
          <p>{user.displayName ?? "User"}</p>
        </li>
        <li className='flex justify-between py-3'>
          <div className='flex'>
            <FontAwesomeIcon icon={faEnvelope} className='mr-2' />
            <p>Email address</p>
          </div>
          <p>{user.email}</p>
        </li>
      </ul>
      <button
        className='outline-none border-transparent focus:border-[#ff47f9] hover:border-[#ff47f9] border-2 p-4 bg-[var(--font)] text-[var(--bgcolor)] rounded-md mb-7'
        onClick={handleOpen}>
        <FontAwesomeIcon icon={faPenToSquare} /> Edit profile
      </button>
      <div>
        <a
          href='/todos'
          className='outline-none focus:border-[#ff47f9] hover:border-[#ff47f9] p-4 border-[3px] border-[var(--font)] rounded-md mb-5'>
          <FontAwesomeIcon icon={faHandPointLeft} /> Back to TODO Man
        </a>
      </div>
      <div className='w-full flex justify-end'>
        <button
          className='outline-none focus:border-[#ff47f9] hover:border-[#ff47f9] p-2 border-[1px] border-[var(--danger)] text-[var(--danger)] mt-[79px] mb-5'
          onClick={() => setIsAccountDeleteModalOpen(true)}>
          Delete account
        </button>
      </div>
      <div
        className={`${
          isEditorOpen || isAccountDeleteModalOpen ? "fixed" : "hidden"
        } editor-modal top-0 left-0 w-screen h-screen bg-[#1be8ff69]`}
      />
      <Editor
        usernameState={[username, setUsername]}
        editorOpenState={[isEditorOpen, setIsEditorOpen]}
        warnState={[warn, setWarn]}
      />
      <AccountDeleteModal
        openState={[isAccountDeleteModalOpen, setIsAccountDeleteModalOpen]}
      />
    </>
  );
}
