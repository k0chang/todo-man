import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(uc => {
        navigate("/todos");
      })
      .catch((e: FirebaseError) => {
        setError(e.code);
        switch (e.code) {
          case "auth/wrong-password":
          case "auth/user-not-found":
            setError(
              "Make sure you have entered the correct email address or password."
            );
            break;
          case "auth/invalid-email":
            setError("Enter the vaild email address.");
            break;
        }
        if (!email && !password) setError("Enter your email and password.");
      });
  };
  return (
    <>
      <h1 className='text-center mb-6'>Todo Man</h1>
      <p className='text-red-500'>{error && error}</p>
      <form onSubmit={handleLogin}>
        <input
          className={`w-full my-5 border-2 border-transparent focus:outline-none focus:border-[#fffb85]`}
          type='email'
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className={`w-full my-5 border-2 border-transparent focus:outline-none focus:border-[#fffb85]`}
          type='password'
          placeholder='Password'
          onChange={e => setPassword(e.target.value)}
        />
        <div className='text-right'>
          <a className='' href='/forgotpassword'>
            Forgot password?
          </a>
        </div>
        <button
          className={`py-3 px-5 my-2 mx-auto block bg-[#fffb85] text-[var(--bgcolor)] hover:bg-[var(--font)] hover:tracking-[1px] transition-all duration-150`}
          type='submit'>
          Login
        </button>
      </form>
      <p className='text-center'>or</p>
      <a
        href='/signup'
        className='py-3 px-5 my-2 w-fit mx-auto block bg-[#fffb85] text-[var(--bgcolor)] hover:bg-[var(--font)] hover:tracking-[1px] transition-all duration-150'>
        Signup
      </a>
    </>
  );
}
