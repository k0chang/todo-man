import { format } from "date-fns";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../features/auth/provider/AuthProvider";
import { db } from "../../lib/firebase";
import { Todo } from "../../types/firebase";

interface UnfinishedTodo {
  todo: Todo;
}

export default function UnfinishedTodo({ todo }: UnfinishedTodo) {
  const { name, createdAt } = todo;
  const { user } = useAuthContext();
  const handleTaskDelete = (_id?: string) => {
    if (!_id) return;
    deleteDoc(doc(db, `users/${user?.uid}/todos`, _id));
  };

  const handleClick = (_id?: string) => {
    if (!_id) return;
    updateDoc(doc(db, `users/${user?.uid}/todos`, _id), {
      done: true,
      updatedAt: serverTimestamp(),
    });
  };
  return (
    <li
      className={`flex flex-wrap justify-between flex-col md:items-center md:flex-row`}>
      <div className='w-full md:w-[60%]'>
        <p className='px-5 py-2 w-full break-words'>{name}</p>
        <p className='px-5 py-2 w-full break-words'>{`Added at: ${
          createdAt
            ? format(createdAt.toDate(), "yyyy-MM-dd, HH:mm:ss")
            : "Cannot read."
        }`}</p>
      </div>
      <div className='h-full min-h-[30px] w-full md:w-[40%] flex flex-row items-center'>
        <button
          className='w-[50%] bg-[#56cb2f]'
          onClick={() => handleClick(todo.id)}>
          ✔︎
        </button>
        <button
          className='bg-[#ff3892] w-[50%]'
          onClick={() => handleTaskDelete(todo.id)}>
          X
        </button>
      </div>
    </li>
  );
}
