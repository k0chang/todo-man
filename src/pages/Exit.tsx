import { useAuthContext } from "../hooks/useAuthContext";

export default function Exit() {
  const { user } = useAuthContext();
  if (!user) return <h3>Thank you for your interest. Bye!</h3>;
  return <></>;
}
