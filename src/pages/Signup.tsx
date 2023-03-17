import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((uc: UserCredential) => {
        navigate("/signup/name");
      })
      .catch((e: FirebaseError) => {
        setError(e.code);
        switch (e.code) {
          case "auth/weak-password":
            setError("Password must be at least 6 characters long.");
        }
        if (!email && !password) setError("Enter new email and password.");
      });
  };
  return (
    <>
      <h1 className='text-center mb-6'>
        Create your new <span className='text-[#fffb85]'>TodoMan</span> account!
      </h1>
      <p className='text-red-500'>{error}</p>
      <form onSubmit={handleSignup}>
        <input
          className={`w-full my-5 border-2 border-transparent focus:outline-none focus:border-[#fffb85]`}
          type='email'
          placeholder='Enter new email'
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className={`w-full my-5 border-2 border-transparent focus:outline-none focus:border-[#fffb85]`}
          type='password'
          placeholder='Enter new password'
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className={`py-3 px-5 my-2 mx-auto block bg-[#fffb85] text-[var(--bgcolor)] hover:bg-[var(--font)] hover:tracking-[1px] transition-all duration-150`}
          type='submit'>
          Signup
        </button>
      </form>
    </>
  );
}
