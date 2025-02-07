export const validateRegisterInput = (email: string, username: string, password: string) => {
    if (!email || !username || !password) throw new Error("All fields are required.");
  };
  
  export const validateLoginInput = (email: string, password: string) => {
    if (!email || !password) throw new Error("Email and password are required.");
  };
  