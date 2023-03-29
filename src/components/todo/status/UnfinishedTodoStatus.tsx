import { format } from "date-fns";
import { UnfinishedTodoStatusT } from "../../../types/props/todos/unfinishedTodoStatus";

export default function UnfinishedTodoStatus({
  todo,
  onClick,
}: UnfinishedTodoStatusT) {
  const { name, createdAt } = todo;
  return (
    <div
      className={`w-full h-[85px] md:w-[60%] text-start flex justify-center items-center flex-col`}
      onClick={onClick}>
      <p className='px-5 w-full truncate break-words'>{name}</p>
      <p className='px-5 w-full break-words'>{`Added at: ${
        createdAt
          ? format(createdAt.toDate(), "yyyy-MM-dd, HH:mm:ss")
          : "Cannot read."
      }`}</p>
    </div>
  );
}
