import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc } from "firebase/firestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { db } from "../../../lib/firebase";
import { TodoDeleteButtonT } from "../../../types/props/todos/todoDeleteButton";

export default function TodoDeleteButton({ todo, onClose }: TodoDeleteButtonT) {
  const { user } = useAuthContext();
  const handleTodoDelete = async (_id?: string) => {
    onClose && onClose();
    if (!_id || !!!user) return;
    await deleteDoc(doc(db, `users/${user?.uid}/todos`, _id));
  };
  return (
    <button
      className='bg-[#ff3892] h-full w-[50%] text-[var(--bgcolor)]'
      onClick={() => handleTodoDelete(todo.id)}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}
