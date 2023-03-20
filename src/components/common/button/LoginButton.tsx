import { useNavigate } from "react-router-dom";
import { CommonButton } from "../../../types/props/common/button";

export default function LoginButton({ show }: CommonButton) {
  const navigate = useNavigate();

  return (
    <button
      className={`${
        !show ? "hidden" : ""
      } absolute right-0 mr-3 w-[80px] py-3 border-[var(--font)] border-2`}
      onClick={() => navigate("/")}>
      Login
    </button>
  );
}
