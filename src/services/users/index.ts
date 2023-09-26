import api from "../../utils/api";

export async function listUsers() {
  return await api.get(`/`);
}