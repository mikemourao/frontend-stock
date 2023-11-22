import api from "../../utils/api";

export async function validateLogin(name: string, password: string) {
  return await api.get(`/login?name=${name}&password=${password}`);
}