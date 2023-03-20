import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";

export default function Home() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const { email, password } = form;
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timeout);
  }, [error]);

  const setFormErr = (code: string) => {
    switch (code) {
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Make sure you have entered the correct email address or password.";
      case "auth/invalid-email":
        return "Enter the vaild email address.";
      case "auth/weak-password":
        return "Password must be at least 6 characters long.";
      default:
        return "An error occurred. Please try again later.";
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const userCredential = async () =>
      await signInWithEmailAndPassword(auth, email, password);
    try {
      const uid = (await userCredential()).user.uid;
      navigate("/todos");
      await setDoc(doc(collection(db, "users"), uid), { todos: [] });
    } catch {
      await userCredential().catch((e: FirebaseError) => {
        setError(setFormErr(e.code));
        if (!email || !password) setError("Enter your email and password.");
      });
    }
  };

  return (
    <>
      <h1 className='text-center mb-6'>Todo Man</h1>
      <p className='text-red-500'>{error && error}</p>
      <form onSubmit={handleLogin}>
        <input
          className={`w-full my-5 border-2 border-transparent focus:border-[#fffb85]`}
          type='email'
          placeholder='Email'
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          className={`w-full my-5 border-2 border-transparent focus:border-[#fffb85]`}
          type='password'
          placeholder='Password'
          onChange={e => setForm({ ...form, password: e.target.value })}
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
