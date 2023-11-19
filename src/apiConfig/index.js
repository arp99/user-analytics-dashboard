import { config } from "../config";



const apiConfig = {
  BaseURl: config.baseUrl,
  auth: {
    login: {
      base: "/v1/auth/login",
      guestLogin: "/v1/auth/guest-login"
    },
    signup: {
      base: "/v1/auth/signup",
    },
  },
  analytics: {
    base: "/v1/analytics",
  },
};

export default apiConfig;
