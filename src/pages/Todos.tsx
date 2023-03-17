import { useAuthContext } from "../features/auth/provider/AuthProvider";

export default function Todos() {
  const authContext = useAuthContext();
  const user = authContext.user;

  return (
    <>
      <p>{`Welcome, ${user?.displayName || user?.email || ""}!`}</p>
    </>
  );
}
