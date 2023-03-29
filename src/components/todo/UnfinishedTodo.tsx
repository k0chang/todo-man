import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Unfinished } from "../../types/props/todos/unfinished";
import { useViewTransition } from "../../utils/transition/useViewTransition";
import TodoDeleteButton from "./button/TodoDeleteButton";
import TodoFinishButton from "./button/TodoFinishButtton";
import TodoModal from "./modal/TodoModal";
import UnfinishedTodoStatus from "./status/UnfinishedTodoStatus";

export default function UnfinishedTodo({ todo }: Unfinished) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const viewTransition = useViewTransition();
  const navigate = useNavigate();

  const handleTodoModalOpen = () => {
    navigate(`/todos#${todo.id}`);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <li
      className={`animate-fadein overflow-hidden w-full h-[130px] md:h-[80px] flex flex-wrap justify-between flex-col md:items-center hover:bg-[var(--bgcolor)] hover:text-[var(--font)] cursor-pointer`}>
      <UnfinishedTodoStatus todo={todo} onClick={handleTodoModalOpen} />
      <div className='h-[45px] md:h-full w-full md:w-[40%] flex flex-row items-center'>
        <TodoFinishButton todo={todo} />
        <TodoDeleteButton todo={todo} />
      </div>
      <TodoModal
        todo={todo}
        open={isModalOpen}
        onClose={handleClose}
        status='yet'
      />
    </li>
  );
}
