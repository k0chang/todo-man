import { format } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../features/auth/provider/AuthProvider";
import { db } from "../../lib/firebase";
import { Todo } from "../../types/firebase";

interface FinishedTodo {
  todo: Todo;
}

export default function FinishedTodo({ todo }: FinishedTodo) {
  const { name, updatedAt } = todo;
  const { user } = useAuthContext();
  const handleMakeUnfinished = (id?: string) => {
    if (!id) return;
    updateDoc(doc(db, `users/${user?.uid}/todos`, id), {
      done: false,
    });
  };
  return (
    <li className={`flex items-center`}>
      <div className='w-[70%]'>
        <p className='px-5 py-2 break-words'>{name}</p>
        <p className='px-5 py-2 w-full break-words'>{`Finished at: ${
          updatedAt
            ? format(updatedAt.toDate(), "yyyy-MM-dd, HH:mm:ss")
            : "Cannot read."
        }`}</p>
      </div>
      <button
        className='bg-[#f952ff] h-full w-[30%] break-words text-[22px]'
        onClick={() => handleMakeUnfinished(todo.id)}>
        ↑
      </button>
    </li>
  );
}
