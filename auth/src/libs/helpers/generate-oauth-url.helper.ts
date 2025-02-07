export const generateGoogleAuthUrl = () => {
    return `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_OAUTH_CALLBACK_URI}&scope=email%20profile&response_type=code`;
  };
  