import {Outlet, Navigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { serverURL } from "src/App";
import LoginPage from "src/pages/Login/Login";

const checkAuth = async () => {
  try {
    const response = await fetch(`${serverURL}/check-auth`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.status === 401) {
      throw new Error("Unauthorized to access this page, please login first");
    }

    const data = await response.json();

    return data.isAuthenticated;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const PrivateRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const checkUserAuth = async () => {
      const authStatus = await checkAuth();
      setIsUserAuthenticated(authStatus);
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