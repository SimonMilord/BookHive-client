import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }: any) => {
  const [isAuth, setIsAuth] = useState<boolean>();

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:8000/check-auth', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuth(true);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    checkAuth();
  }, []);

  return isAuth ? children : null;
};

export default PrivateRoute;