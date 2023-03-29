import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Finished } from "../../types/props/todos/finished";
import { useViewTransition } from "../../utils/transition/useViewTransition";
import TodoDeleteButton from "./button/TodoDeleteButton";
import TodoRestoreButton from "./button/TodoRestoreButton";
import TodoModal from "./modal/TodoModal";
import FinishedTodoStatus from "./status/FinishedTodoStatus";

export default function FinishedTodo({ todo }: Finished) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const viewTransition = useViewTransition();
  const navigate = useNavigate();

  const handleTodoModalOpen = () => {
    setIsModalOpen(true);
    navigate(`/todos#${todo.id}`);
  };
  const onClose = () => {
    setIsModalOpen(false);
  };
  return (
    <li
      className={`animate-fadein overflow-hidden w-full h-[130px] md:h-[80px] flex flex-wrap justify-between flex-col md:items-center hover:bg-[var(--bgcolor)] hover:text-[var(--font)] cursor-pointer`}>
      <FinishedTodoStatus todo={todo} onClick={handleTodoModalOpen} />
      <div className='h-[45px] md:h-full w-full md:w-[40%] flex flex-row items-center'>
        <TodoRestoreButton todo={todo} />
        <TodoDeleteButton todo={todo} />
      </div>
      <TodoModal
        todo={todo}
        open={isModalOpen}
        onClose={onClose}
        status='finished'
      />
    </li>
  );
}
