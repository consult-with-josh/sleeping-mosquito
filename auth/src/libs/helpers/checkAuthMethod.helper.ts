export const checkAuthMethod = (user: any): string => {
    if (user.googleId) return "Google";
    return "Email/Password";
  };
  