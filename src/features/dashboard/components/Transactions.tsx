import { useEffect, useState } from "react";
import type { AttendanceStatus } from "../types";
import { fetchAttendanceStatus } from "../api";

const Transactions = () => {
  const [data, setData] =
    useState<AttendanceStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchAttendanceStatus();
        setData(res);
      } catch (err) {
        console.error("Error fetching attendance status");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatMinutes = (minutes: string) => {
    const total = Number(minutes);
    const h = Math.floor(total / 60);
    const m = total % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="transactions">
      <div className="card p-4 rounded-4 shadow-sm border-0">
        <h5 className="fw-bold mb-4">
          Today's Attendance Status
        </h5>

        {loading && <p>Loading...</p>}

        {!loading && data && (
          <div className="row g-3">

            <div className="col-md-6">
              <div className="p-3 rounded-3 bg-light">
                <small className="text-muted">
                  Check In
                </small>
                <h6 className="fw-bold mt-1">
                  {data.check_in
                    ? new Date(
                        data.check_in
                      ).toLocaleTimeString()
                    : "-"}
                </h6>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded-3 bg-light">
                <small className="text-muted">
                  Check Out
                </small>
                <h6 className="fw-bold mt-1">
                  {data.check_out
                    ? new Date(
                        data.check_out
                      ).toLocaleTimeString()
                    : "-"}
                </h6>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded-3 bg-success bg-opacity-10">
                <small className="text-muted">
                  Working Hours
                </small>
                <h6 className="fw-bold mt-1 text-success">
                  {formatMinutes(
                    data.working_minutes
                  )}
                </h6>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded-3 bg-warning bg-opacity-10">
                <small className="text-muted">
                  Overtime
                </small>
                <h6 className="fw-bold mt-1 text-warning">
                  {formatMinutes(
                    data.overtime_minutes
                  )}
                </h6>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded-3 bg-danger bg-opacity-10">
                <small className="text-muted">
                  Late Minutes
                </small>
                <h6 className="fw-bold mt-1 text-danger">
                  {formatMinutes(
                    data.late_minutes
                  )}
                </h6>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 rounded-3 bg-info bg-opacity-10">
                <small className="text-muted">
                  Deduction
                </small>
                <h6 className="fw-bold mt-1 text-info">
                  {data.deduction_day} Day
                </h6>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;