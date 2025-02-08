import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://event-backends.onrender.com',
  //baseURL: "http://localhost:5000",
  timeout: 1000,
  withCredentials: true,
});

export default axiosInstance;
