import api from "../../utils/api";

export async function listProducts() {
  return await api.get(`/products`);
}