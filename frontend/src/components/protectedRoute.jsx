import { Navigate } from "react-router-dom";

export default protectedRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/userDashBoard" />;
};
