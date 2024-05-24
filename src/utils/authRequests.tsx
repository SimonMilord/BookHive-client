import { serverURL } from "src/App";

export const logout = async () => {
  try {
    window.location.href = `${serverURL}/logout`
  } catch (error) {
    console.error(error);
  }
};

export const login = async () => {
  try{
    window.location.href = `${serverURL}/auth/google`;
  } catch (error) {
    console.error(error);
  }
};

export const checkAuth = async () => {
  try {
    const response = await fetch(`${serverURL}/auth/check`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Unable to check auth");
    }

    const data = await response.json();
    return data.isAuthenticated;
  } catch (error) {
    console.error(error);
    return false;
  }
};