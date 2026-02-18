import api from "./api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await api.post("/users", data);
  return response.data;
};

export const loginUser = async (data: LoginPayload) => {
  const response = await api.post("/users/login", data);
  return response.data;
};