import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { auth, db } from "../lib/firebase";
import { useViewTransition } from "../utils/transition/useViewTransition";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });
  const [email, password] = [watch("email"), watch("password")];
  const [error, setError] = useState("");
  const viewTransition = useViewTransition();

  const pattern = {
    email: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Invalid email address.",
    },
    password: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d.?\-+]{8,32}$/,
      message:
        "Passwords must contain uppercase, lowercase and numbers must be included.  A total of at least 8 and no more than 32 characters. Also symbols are available: .?-+",
    },
  };

  const onSubmit = async (data: FieldValues) => {
    if (!email || !password) {
      setError("Enter new email and password.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (!user.user.emailVerified) {
        await sendEmailVerification(user.user);
        viewTransition("/signup/sent-email");
      }
      const uid = user.user.uid;
      await setDoc(doc(collection(db, "users"), uid), { todos: [] });
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e);
        setError(e.code);
        switch (e.code) {
          case "auth/weak-password":
            setError("Password must be at least 6 characters long.");
            break;
          case "auth/email-already-in-use":
            setError("This email is already in use.");
            break;
        }
      }
    }
  };
  return (
    <>
      <h1 className='text-center mb-6'>
        Create your new <span className='text-[#fffb85]'>TodoMan</span> account!
      </h1>
      <p className='text-red-500'>{error}</p>
      <form onSubmit={handleSubmit(onSubmit, onSubmit)} noValidate>
        <input
          {...register("email", {
            required: true,
            pattern: pattern.email,
          })}
          className={`w-full mt-5 mb-2 border-2 border-transparent focus:border-[#fffb85]`}
          type='email'
          placeholder='user@example.com'
        />
        <p className='text-red-500'>{errors.email?.message}</p>
        <input
          {...register("password", {
            required: true,
            pattern: pattern.password,
            minLength: { value: 6, message: `At least 6 characters required.` },
          })}
          className={`w-full mt-5 mb-2 border-2 border-transparent focus:border-[#fffb85]`}
          type='password'
          placeholder='Password'
        />
        <p className='text-red-500'>{errors.password?.message}</p>
        <button
          className={`py-3 px-5 my-2 mx-auto block bg-[#fffb85] text-[var(--bgcolor)] hover:bg-[var(--font)] hover:tracking-[1px] transition-all duration-150`}
          type='submit'>
          Signup
        </button>
      </form>
    </>
  );
}
