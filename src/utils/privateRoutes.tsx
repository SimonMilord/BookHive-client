import {Outlet, Navigate} from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "src/pages/Login/Login";
import { checkAuth } from "./authRequests";

const PrivateRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const checkUserAuth = async () => {
      const authResponse = await checkAuth();
      setIsUserAuthenticated(authResponse.isAuthenticated);
      setIsLoading(false);
    };

    checkUserAuth();
  }, []);

  if (isLoading) {
    return <LoginPage isLoading></LoginPage>;
  }

  return (
    isUserAuthenticated ? <Outlet /> : <Navigate to="/login" />
  )
};

export default PrivateRoutes;