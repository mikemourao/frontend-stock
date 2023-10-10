import api from "../../utils/api";

export async function getProductID(id: any) {
  return await api.get(`/product?id=${id}`);
}