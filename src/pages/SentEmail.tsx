import { useAuthContext } from "../hooks/useAuthContext";
import UserName from "./UserName";

export default function SentEmail() {
  const { user } = useAuthContext();
  if (user) {
    return user.emailVerified ? (
      <UserName />
    ) : (
      <p>Please confirm that we have sent you an email for authentication.</p>
    );
  }
  return (
    <p>Please confirm that we have sent you an email for authentication.</p>
  );
}
