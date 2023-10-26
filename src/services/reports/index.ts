import api from "../../utils/api";

export async function getProductID(id: any) {
  return await api.get(`/product?id=${id}`);
}

export async function createReport(data: any) {
  return await api.post(`/reports`, data);
}

export async function listReports() {
  return await api.get(`/reports`);
}