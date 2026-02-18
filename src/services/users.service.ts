import api from "./api";

export const getEmployees = async () => {
  const res = await api.get("/users/employees");
  return res.data;
};

export const toggleEmployeeStatus = async (id: string) => {
  const res = await api.patch(`/users/${id}/status`);
  return res.data;
};
