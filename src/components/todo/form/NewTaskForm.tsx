import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useAuthContext } from "../../../features/auth/provider/AuthProvider";
import { db } from "../../../lib/firebase";
import { Todo } from "../../../types/firebase";

interface NewTaskForm {
  setWarn: Dispatch<SetStateAction<string | null>>;
  todos: Todo[];
}

export default function NewTaskForm({ setWarn, todos }: NewTaskForm) {
  const [newTodo, setNewTodo] = useState<string | null>(null);
  const { user } = useAuthContext();
  const handleTaskSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTodo) {
      setWarn("Enter new task.");
      return;
    }
    setNewTodo("");
    setWarn(null);
    await addDoc(collection(db, `/users/${user?.uid}/todos`), {
      name: newTodo,
      done: false,
      createdAt: serverTimestamp(),
    })
      .then()
      .catch();
  };
  return (
    <form className='w-full flex justify-between' onSubmit={handleTaskSubmit}>
      <input
        className='w-[67%]'
        type='text'
        placeholder='New task'
        value={newTodo || ""}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button className='w-[33%] text-center inline-block py-[5px] px-3 border-[var(--font)] border-2'>
        Add ↩︎
      </button>
    </form>
  );
}
