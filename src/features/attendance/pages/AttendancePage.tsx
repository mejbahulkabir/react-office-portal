import { useState, useEffect } from "react";
import { fetchAttendanceApi } from "../api";
import type { AttendanceItem } from "../types";
import "../../../styles/dashboard.css";

const ITEMS_PER_PAGE = 10;

const AttendancePage = () => {
  const [attendance, setAttendance] = useState<AttendanceItem[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Fetch last 10 days by default
  useEffect(() => {
    const today = new Date();
    const last10 = new Date();
    last10.setDate(today.getDate() - 9);

    const format = (date: Date) =>
      date.toISOString().split("T")[0];

    const defaultFrom = format(last10);
    const defaultTo = format(today);

    setFrom(defaultFrom);
    setTo(defaultTo);

    fetchAttendance(defaultFrom, defaultTo);
  }, []);

  const fetchAttendance = async (f: string, t: string) => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchAttendanceApi(f, t);
      setAttendance(data.data.data);
      setCurrentPage(1); // reset pagination
    } catch {
      setError("Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    if (!from || !to) {
      setError("Please select both dates");
      return;
    }
    fetchAttendance(from, to);
  };

  const formatMinutes = (minutes: string) => {
    const total = Number(minutes);
    const h = Math.floor(total / 60);
    const m = total % 60;
    return `${h}h ${m}m`;
  };

  // ✅ Pagination Logic
  const totalPages = Math.ceil(attendance.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = attendance.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="container-fluid p-4">
      <h3 className="fw-bold mb-4">Attendance History</h3>

      {/* Filter */}
      <div className="card shadow-sm p-3 mb-4">
        <div className="row align-items-end">
          <div className="col-md-3">
            <label className="form-label">From</label>
            <input
              type="date"
              className="form-control"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">To</label>
            <input
              type="date"
              className="form-control"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              onClick={handleFilter}
              disabled={loading}
            >
              {loading ? "Loading..." : "Filter"}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-danger mt-3">{error}</div>
        )}
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Working</th>
                <th>Late</th>
              </tr>
            </thead>
            <tbody>
              {!loading && currentData.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No attendance found
                  </td>
                </tr>
              )}

              {currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>

                  <td>
                    {item.check_in
                      ? new Date(item.check_in).toLocaleTimeString()
                      : "-"}
                  </td>

                  <td>
                    {item.check_out
                      ? new Date(item.check_out).toLocaleTimeString()
                      : "-"}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        item.status === "present"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{formatMinutes(item.working_minutes)}</td>
                  <td>{formatMinutes(item.late_minutes)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Pagination UI */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-end p-3">
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages && "disabled"
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;