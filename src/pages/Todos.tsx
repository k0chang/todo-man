import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import FinishedTodo from "../components/todo/FinishedTodo";
import NewTaskForm from "../components/todo/form/NewTaskForm";
import UnfinishedTodo from "../components/todo/UnfinishedTodo";
import { useAuthContext } from "../hooks/useAuthContext";
import { db } from "../lib/firebase";
import { Todo } from "../types/data/firestore/todo";

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [warn, setWarn] = useState<string | null>(null);
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(db, `users/${user.uid}/todos`),
        snapshot => {
          setTodos(
            snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }))
          );
        }
      );
      return unsubscribe;
    }
  }, [user?.uid]);

  const sortedTodos = [...todos].slice().sort((a, b) => {
    if (!a.createdAt) return -1;
    if (!b.createdAt) return 1;
    const dateA =
      a.createdAt instanceof Timestamp ? a.createdAt.toDate() : a.createdAt;
    const dateB =
      b.createdAt instanceof Timestamp ? b.createdAt.toDate() : b.createdAt;
    return dateB.getTime() - dateA.getTime();
  });
  const unfinishedTodos = [...sortedTodos].filter(todo => !todo.done);
  const finishedTodos = [...sortedTodos]
    .filter(todo => todo.done)
    .sort((a, b) => {
      if (!a.updatedAt) return -1;
      if (!b.updatedAt) return 1;
      const dateA =
        a.updatedAt instanceof Timestamp ? a.updatedAt.toDate() : a.updatedAt;
      const dateB =
        b.updatedAt instanceof Timestamp ? b.updatedAt.toDate() : b.updatedAt;
      return dateB.getTime() - dateA.getTime();
    })
    .reverse();

  if (!user) {
    return <h2>To manage tasks, first log in!</h2>;
  }
  if (!user.emailVerified) {
    return <h2>First confirm email address.</h2>;
  }
  return (
    <>
      <h2 className='text-center mb-8'>Manage your tasks!</h2>
      <p className='my-5 text-[#fff75a]'>{warn}</p>
      <NewTaskForm setWarn={setWarn} todos={todos} />
      <div className='mt-8'>
        <h3>Unfinished tasks</h3>
        <ul className='bg-[var(--font)] text-[var(--bgcolor)] selection:bg-[var(--bgcolor)] selection:text-[var(--font)]'>
          {unfinishedTodos.length === 0 && (
            <p className='p-2'>Looks like you haven't added any tasks yet.</p>
          )}
          {unfinishedTodos.map((todo, i) => (
            <UnfinishedTodo key={i} todo={todo} />
          ))}
        </ul>
      </div>
      <div className='mt-10'>
        <h3>Finished tasks</h3>
        <ul className='bg-[var(--font)] text-[var(--bgcolor)] selection:bg-[var(--bgcolor)] selection:text-[var(--font)]'>
          {finishedTodos.length === 0 && (
            <p className='p-2'>Any tasks seem to have been finished.</p>
          )}
          {finishedTodos.map((todo, i) => (
            <FinishedTodo key={i} todo={todo} />
          ))}
        </ul>
      </div>
    </>
  );
}
