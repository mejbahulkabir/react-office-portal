import api from "../../shared/services/api";

export const getPayroll = async () => {
  return await api.get("/employee/payroll");
};
