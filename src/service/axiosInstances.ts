import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const client = axios.create({
  baseURL: BASE_URL,
  validateStatus: function (status) {
    return status < 1000; // Resolve only if the status code is less than 500
  }
});