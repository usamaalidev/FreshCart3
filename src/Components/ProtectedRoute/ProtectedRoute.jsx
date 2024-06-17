import { useContext } from "react";
import { UserContext } from "../../Context/User.context";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(UserContext);
  if (token) {
    return children;
  }

  return <Navigate to="/auth/login" />;
}
