import { FirebaseError } from "firebase/app";
import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { db } from "../../lib/firebase";
import { AccountDeleteModalT } from "../../types/props/profile/accountdelete";
import { useViewTransition } from "../../utils/transition/useViewTransition";

export default function AccountDeleteModal({
  openState: [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen],
}: AccountDeleteModalT) {
  const [error, setError] = useState("");
  const { user } = useAuthContext();
  const viewTransition = useViewTransition();

  function handleClose() {
    setIsAccountDeleteModalOpen(false);
  }
  async function handleConfirm() {
    if (!user) {
      setError("User not found.");
      return;
    }
    try {
      await deleteDoc(doc(db, `users/${user.uid}`));
      await deleteUser(user).then(() => {
        viewTransition("/exit");
        setIsAccountDeleteModalOpen(false);
      });
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code);
        setError("Failed to delete your account.");
      }
      return;
    }
  }
  return (
    <div
      className={`editor-inner ${
        isAccountDeleteModalOpen ? "fixed" : "hidden"
      } top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[77%] max-w-[600px] h-auto bg-[var(--bgcolor)]`}>
      <div className='w-[87%] mx-auto my-4'>
        <h3 className='text-center text-[var(--danger)] mb-5'>
          Danger: Are you sure you want to delete your account?
        </h3>
        <p>If you confirm, all data on your TODO list will also be deleted.</p>
        <p className='text-[var(--danger)] mt-5'>{error}</p>
        <div className='flex justify-center gap-7 mt-10'>
          <button
            className={`outline-none border-transparent focus:border-[#ff47f9] border-2 py-3 px-5 my-2 block bg-[#fffb85] text-[var(--bgcolor)] hover:bg-[var(--font)] hover:tracking-[1px] transition-all duration-150`}
            onClick={handleClose}>
            Cancel
          </button>
          <button
            className={`outline-none border-transparent focus:border-[#ff47f9] border-2 py-3 px-5 my-2 block bg-[var(--danger)] text-[var(--bgcolor)] hover:bg-[var(--font)] hover:tracking-[1px] transition-all duration-150`}
            onClick={handleConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
