import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { db } from "../../../lib/firebase";
import { TodoRestoreButtonT } from "../../../types/props/todos/todoRestoreButton";

export default function TodoRestoreButton({
  todo,
  onClose,
}: TodoRestoreButtonT) {
  const { user } = useAuthContext();
  const handleTodoRestore = (_id?: string) => {
    if (!_id || !user) return;
    onClose && onClose();
    updateDoc(doc(db, `users/${user.uid}/todos`, _id), {
      done: false,
    });
  };
  return (
    <button
      className='bg-[#f952ff] break-words text-[22px] h-[45px] md:h-full w-[50%] text-[var(--bgcolor)]'
      onClick={() => handleTodoRestore(todo.id)}>
      <FontAwesomeIcon icon={faArrowsRotate} />
    </button>
  );
}
