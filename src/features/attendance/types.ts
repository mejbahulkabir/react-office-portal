// attendance/types.ts

export interface AttendanceItem {
  id: number;
  user_id: string;
  office_id: string;
  date: string;
  status: string;
  check_in: string;
  check_out: string;
  working_minutes: string;
  overtime_minutes: string;
  late_minutes: string;
  deduction_day: string;
}

export interface AttendanceResponse {
  success: boolean;
  data: {
    current_page: number;
    data: AttendanceItem[];
  };
}