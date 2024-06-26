import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { db } from "../../../lib/firebase";
import { NewTaskFormT } from "../../../types/props/todos/newTaskForm";

export default function NewTaskForm({ setWarn }: NewTaskFormT) {
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
    <form
      className='w-full flex justify-between'
      onSubmit={handleTaskSubmit}
      noValidate>
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
