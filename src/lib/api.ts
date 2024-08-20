import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.response.use(
  function (response) {
    return response.data;
  },

  function (error) {
    const message =
      error?.response?.data?.error || error.message || error.toString();

    error.message =
      typeof message === "string" ? message : JSON.stringify(message);

    console.error(error.message);

    return Promise.reject(error);
  }
);

export default apiClient;
