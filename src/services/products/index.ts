import api from "../../utils/api";

export async function listProducts() {
  return await api.get(`/products`);
}

export async function createProducts(data: any) {
  return await api.post(`/products`, data);
}

export async function deleteProduct(id: number) {
  return await api.delete(`/products/${id}`);
}