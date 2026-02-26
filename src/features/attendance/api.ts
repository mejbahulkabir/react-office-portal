import api from "../../shared/services/api";
import type { AttendanceResponse } from "./types";

export const startAttendance = async () => {
  return await api.post("/attendance/start");
};

export const stopAttendance = async () => {
  return await api.post("/attendance/stop");
};

export const fetchAttendanceApi = async (
  from: string,
  to: string
): Promise<AttendanceResponse> => {
  const response = await api.get<AttendanceResponse>(
    "/attendance/history",
    {
      params: { from, to},
    }
  );
  return response.data;
};
