import api from "../../utils/api";

export async function listUsers() {
  return await api.get(`/`);
}

export async function createUser(data: any) {
  return await api.post(`/`, data);
}