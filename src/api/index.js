import axios from "axios";
import { toast } from "react-toastify";
import config from "../apiConfig";

let headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

let securedHeaders = {
  ...headers,
  authorization: `Bearer ${localStorage.getItem("token")}`,
};

const errorCallback = (error) => {
  const { response } = error;
  if (response.status === 403) {
    toast.error(`${response.data.message}, Logging out`);
    setTimeout(() => {
      // logout();
    }, 1600);
    return;
  }
  return response;
};

const axiosInstance = axios.create({
  baseURL: config.BaseURl,
  headers: securedHeaders,
});

axiosInstance.interceptors.response.use((response) => response, errorCallback);

const API = {
  loginUser(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.BaseURl}${config.auth.login.base}`, {
          ...data,
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },

  guestLogin() {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.BaseURl}${config.auth.login.guestLogin}`)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },

  signupUser(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.BaseURl}${config.auth.signup.base}`, {
          ...data,
        })
        .then((res) => resolve(res.data))
        .catch((err) => {
          console.log("error: ", err);

          return reject(err);
        });
    });
  },

  getAnalytics(filter = {}) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(config.analytics.base, {
          params: {
            ...filter,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  },
};

export default API;
