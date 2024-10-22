import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_STRAPI_SERVER_URL}`,
})

