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
