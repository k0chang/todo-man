import { format } from "date-fns";
import { FinishedTodoStatusT } from "../../../types/props/todos/finishedTodoStatus";

export default function FinishedTodoStatus({
  todo: { name, updatedAt },
  onClick,
}: FinishedTodoStatusT) {
  return (
    <div
      className='w-full h-[85px] md:w-[60%] text-start flex justify-center items-center flex-col'
      onClick={onClick}>
      <p className='px-5 w-full truncate break-words'>{name}</p>
      <p className='px-5 w-full break-words'>{`Finished at: ${
        updatedAt
          ? format(updatedAt.toDate(), "yyyy-MM-dd, HH:mm:ss")
          : "Could not read."
      }`}</p>
    </div>
  );
}
