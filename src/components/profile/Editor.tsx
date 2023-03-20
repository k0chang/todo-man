import { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { FormEvent } from "react";
import { auth } from "../../lib/firebase";
import { EditorT } from "../../types/props/profile/editor";

export default function Editor({
  usernameState: [username, setUsername],
  editorOpenState: [isEditorOpen, setIsEditorOpen],
  warnState: [warn, setWarn],
}: EditorT) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      setIsEditorOpen(true);
      setWarn("Enter new user name. At least one letter is required.");
      return;
    }
    if (!auth.currentUser) return;
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        setIsEditorOpen(false);
      })
      .catch((e: FirebaseError) => {
        setIsEditorOpen(false);
        setWarn("Some kind of problem has occurred. Please try again.");
      });
  };

  const handleClose = () => setIsEditorOpen(false);
  return (
    <div
      className={`editor-inner ${
        isEditorOpen ? "fixed" : "hidden"
      } top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[77%] max-w-[600px] h-auto bg-[var(--bgcolor)]`}>
      <div className='w-[87%] mx-auto my-4'>
        <h3 className='text-center mb-5'>Change profile?</h3>
        <p className='text-yellow-300'>{warn}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>User name</label>
          <input
            id='username'
            className='w-full border-2 border-transparent focus:border-[#fffb85]'
            type='text'
            placeholder={`New user name`}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <div className='flex justify-center gap-4 mt-3'>
            <button
              className={`outline-none border-transparent focus:border-[#ff47f9] border-2 py-3 px-5 my-2 block bg-[#fffb85] text-[var(--bgcolor)] hover:bg-[var(--font)] hover:tracking-[1px] transition-all duration-150`}
              onClick={handleClose}>
              Cancel
            </button>
            <input
              id='save'
              className={`border-transparent focus:border-[#ff47f9] border-2 py-3 px-5 my-2 block bg-[#fffb85] text-[var(--bgcolor)] hover:bg-[var(--font)] hover:tracking-[1px] transition-all duration-150`}
              type='submit'
              value={`Save`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
