import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.121:8000/api", // Replace with your base URL
  timeout: 10000, // Optional: Set a timeout for requests
});

export default axiosInstance;
