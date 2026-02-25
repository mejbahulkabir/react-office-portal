export interface DashboardSummary {
  totalPresent: number;
  totalAbsent: number;
  totalPayroll: number;
}

export interface AttendanceStatusResponse {
  isCheckedIn: boolean;
}

export interface AttendancePayload {
  latitude: number;
  longitude: number;
}

export interface AttendanceStatus {
  attendance_status: boolean;
  check_in: string | null;
  check_out: string | null;
  working_minutes: string;
  overtime_minutes: string;
  late_minutes: string;
  deduction_day: string;
}
