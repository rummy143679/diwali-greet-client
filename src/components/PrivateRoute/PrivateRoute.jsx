import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const autheticateUser = async () => {
    // Ask backend if user is authenticated
    await axios
      .get(`${apiUrl}/api/v1/user/auth`, { withCredentials: true })
      .then((res) => {
        if (res.data.status) setIsAuthenticated(res.data.status);
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  };

  useEffect(() => autheticateUser, []);
  console.log("isAuthenticated", isAuthenticated);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
