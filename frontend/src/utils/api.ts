import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = "https://localhost:7032/api";

export const getApiClient = () => {
  const token = useAuthStore.getState().token;
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
