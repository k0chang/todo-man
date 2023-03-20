import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  // const { email, password } = formValues;s
  const [email, password] = [watch("email"), watch("password")];
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const userCredential = createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = (await userCredential).user.uid;
    await userCredential
      .then(async (uc: UserCredential) => {
        await setDoc(doc(collection(db, "users"), uid), { todos: [] });
        navigate("/signup/name");
      })
      .catch((e: FirebaseError) => {
        setError(e.code);
        switch (e.code) {
          case "auth/weak-password":
            setError("Password must be at least 6 characters long.");
            break;
          case "auth/invalid-email":
            setError("Please enter valid email address.");
        }
        if (!email || !password) setError("Enter new email and password.");
      });
  };

  return (
    <>
      <h1 className='text-center mb-6'>
        Create your new <span className='text-[#fffb85]'>TodoMan</span> account!
      </h1>
      <p className='text-red-500'>{error}</p>
      <form onSubmit={handleSubmit(onSubmit, onSubmit)}>
        <input
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            minLength: { value: 5, message: `At least 5 characters required.` },
          })}
          className={`w-full mt-5 mb-2 border-2 border-transparent focus:border-[#fffb85]`}
          type='email'
          placeholder='user@example.com'
          // onChange={e =>
          //   setFormValues({ ...formValues, email: e.target.value })
          // }
        />
        <p className='text-red-500'>{errors.email?.message}</p>
        <input
          {...register("password", {
            required: true,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.?\-+/])[a-zA-Z\d.?\-+/]{8,25}$/,
            minLength: { value: 6, message: `At least 6 characters required.` },
          })}
          className={`w-full mt-5 mb-2 border-2 border-transparent focus:border-[#fffb85]`}
          type='password'
          placeholder='Password'
          // onChange={e =>
          //   setFormValues({ ...formValues, password: e.target.value })
          // }
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
