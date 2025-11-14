import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const autheticateUser = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/user/auth`, {
        withCredentials: true,
      });

      setIsAuthenticated(res.data.status === true);
    } catch (err) {
      console.log(err)
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    autheticateUser();
  }, []);

  // 🔄 Show a loading screen until backend responds
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
