import { format } from "date-fns";
import { TodoModalT } from "../../../types/props/todos/todoModal";
import TodoDeleteButton from "../button/TodoDeleteButton";
import TodoFinishButton from "../button/TodoFinishButtton";
import TodoRestoreButton from "../button/TodoRestoreButton";
import BackScreen from "./BackScreen";

export default function TodoModal({ todo, open, onClose, status }: TodoModalT) {
  return (
    <>
      <BackScreen open={open} onClose={onClose} />
      <div
        className={`task-modal p-10 fixed w-fit max-w-[87%] h-fit m-auto inset-0 bg-[var(--font)] transition-all duration-[0.3s] ease-linear ${
          open ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-0"
        } cursor-auto`}>
        <p className='break-words text-[var(--bgcolor)]'>{todo.name}</p>
        <p className='break-words text-[var(--bgcolor)]'>{`${
          status === "finished"
            ? "Finished at"
            : status === "yet"
            ? "Added at"
            : "Date"
        }: ${
          todo.createdAt
            ? format(todo.createdAt.toDate(), "yyyy-MM-dd, HH:mm:ss")
            : "Cannot read."
        }`}</p>
        <div className='mt-10 h-[60px] w-full flex flex-row items-center'>
          {status === "finished" ? (
            <TodoRestoreButton todo={todo} onClose={onClose} />
          ) : (
            <TodoFinishButton todo={todo} onClose={onClose} />
          )}
          <TodoDeleteButton todo={todo} onClose={onClose} />
        </div>
      </div>
    </>
  );
}
