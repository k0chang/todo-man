import { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { FormEvent, useState } from "react";
import { auth } from "../lib/firebase";
import { useViewTransition } from "../utils/transition/useViewTransition";

export default function UserName() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const viewTransition = useViewTransition();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name) {
      setError("User name is empty.");
      return;
    }
    updateProfile(auth.currentUser!, { displayName: name })
      .then(() => {
        viewTransition("/todos");
      })
      .catch((error: FirebaseError) => {
        setError("Error occured.");
      });
  };
  return (
    <>
      <h2 className='mb-4'>Setting user name?</h2>
      <p className='text-red-500'>{error}</p>
      <form onSubmit={handleSubmit} className='mt-3'>
        <div>
          <input
            className={`w-full my-5 border-2 border-transparent focus:outline-none focus:border-[#fffb85]`}
            type='text'
            placeholder='Type new user name'
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <button
            type='submit'
            className={`w-full py-3 px-5 my-2 mx-auto block bg-[#fffb85] text-[var(--bgcolor)] hover:bg-[var(--font)] hover:tracking-[1px] transition-all duration-150`}>
            Submit
          </button>
          <button
            className={`w-full py-3 px-5 my-2 mx-auto block bg-[#fffb85] text-[var(--bgcolor)] hover:bg-[var(--font)] hover:tracking-[1px] transition-all duration-150`}
            onClick={() => viewTransition("/todos")}>
            I'll do that later.
          </button>
        </div>
      </form>
    </>
  );
}
