import { CommonButton } from "../../../types/props/common/button";
import { useViewTransition } from "../../../utils/transition/useViewTransition";

export default function LoginButton({ show }: CommonButton) {
  const viewTransition = useViewTransition();

  return (
    <button
      className={`${
        !show ? "hidden" : ""
      } absolute right-0 mr-3 w-[80px] py-3 border-[var(--font)] border-2`}
      onClick={() => viewTransition("/")}>
      Login
    </button>
  );
}
