import { serverURL } from "src/App";

export const login = async () => {
  try{
    window.location.href = `${serverURL}/auth/google`;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    window.location.href = `${serverURL}/auth/logout`
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

    if (response.status === 401) {
      throw new Error("Unauthorized to access this page, please login first");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};