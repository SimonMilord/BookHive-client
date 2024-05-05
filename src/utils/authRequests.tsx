export const logout = async () => {
  try {
    window.location.href = 'http://localhost:8000/logout'
  } catch (error) {
    console.error(error);
  }
};

export const login = async () => {
  try{
    window.location.href = 'http://localhost:8000/auth/google';
  } catch (error) {
    console.error(error);
  }
};
