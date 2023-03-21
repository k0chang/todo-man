import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { FormEvent, useState } from "react";
import { auth } from "../lib/firebase";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) {
      setError("Enter email address.");
      return;
    }
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsEmailSent(true);
      })
      .catch(e => {
        if (e instanceof FirebaseError) {
          switch (e.code) {
            case "auth/user-not-found":
              setError("No such email address is registered.");
              break;
            case "auth/invalid-email":
              setError("Invalid email address.");
              break;
          }
        }
      });
  }
  return (
    <>
      <h1 className='text-center mb-6'>Confirm email</h1>
      <p className='mb-8'>
        Please enter your email address. A confirmation email will be sent to
        it.
      </p>
      <p className={`text-red-500 ${!!error ? "" : "hidden"}`}>{error}</p>
      <form className='' onSubmit={handleSubmit} noValidate>
        <input
          className={`w-full mb-5 border-2 border-transparent focus:border-[#fffb85]`}
          type='email'
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
        />
        <button
          className={`py-3 px-5 my-2 mx-auto block bg-[#fffb85] text-[var(--bgcolor)] hover:bg-[var(--font)] hover:tracking-[1px] transition-all duration-150`}
          type='submit'>
          Send
        </button>
      </form>
      <div className={`${isEmailSent ? "" : "hidden"} mt-10 text-yellow-200`}>
        <p className='text-justify'>
          An email has been sent to you to reset your password. Please check
          your mailbox and follow the instructions to reset your password. And
          login again.
        </p>
      </div>
    </>
  );
}
