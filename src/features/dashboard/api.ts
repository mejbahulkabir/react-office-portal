import axios from "axios";
import type {
  DashboardSummary,
  AttendanceStatusResponse,
  AttendancePayload,
} from "./types";
import api from "../../shared/services/api"; // adjust path if needed
import type { AttendanceStatus } from "./types";

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const res = await axios.get("/dashboard/status");
  return res.data;
};

export const getAttendanceStatus = async (): Promise<AttendanceStatusResponse> => {
  const res = await axios.get("/attendance/status");
  return res.data;
};

export const startAttendance = async (payload: AttendancePayload) => {
  const res = await axios.post("/attendance/start", payload);
  return res.data;
};

export const stopAttendance = async (payload: AttendancePayload) => {
  const res = await axios.post("/attendance/stop", payload);
  return res.data;
};



export const fetchAttendanceStatus =
  async (): Promise<AttendanceStatus> => {
    const response = await api.get(
      "/employee/attendance/status"
    );
    return response.data;
  };
