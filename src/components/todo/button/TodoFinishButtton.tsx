import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { db } from "../../../lib/firebase";
import { TodoFinishButtonT } from "../../../types/props/todos/todoFinishButton";

export default function TodoFinishButton({ todo, onClose }: TodoFinishButtonT) {
  const { user } = useAuthContext();
  const handleTodoFinish = async (_id?: string) => {
    onClose && onClose();
    if (!_id || !!!user) return;
    await updateDoc(doc(db, `users/${user.uid}/todos`, _id), {
      done: true,
      updatedAt: serverTimestamp(),
    });
  };
  return (
    <button
      className='w-[50%] h-full bg-[#56cb2f] text-[var(--bgcolor)]'
      onClick={() => handleTodoFinish(todo.id)}>
      <FontAwesomeIcon icon={faCircleCheck} />
    </button>
  );
}
