import api from "../../shared/services/api";
import type { LoginPayload } from "./types";

export const loginApi = async (data: LoginPayload) => {
  const response = await api.post("/employee/login", data);
  return response.data;
};
