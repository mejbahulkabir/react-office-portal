import { useEffect, useState } from "react";
import {
  fetchAttendanceStatus,
  startAttendance,
  stopAttendance,
} from "../api";
import type { AttendanceStatus } from "../types";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Cards from "../components/Cards";
import Transactions from "../components/Transactions";
import "../../../styles/dashboard.css";

export const DashboardPage = () => {
  const [summary, setSummary] =
    useState<AttendanceStatus | null>(null);

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Load dashboard data
  useEffect(() => {
    const loadData = async () => {
      try {
        const statusData = await fetchAttendanceStatus();

        console.log("API DATA:", statusData); // 🔥 Debug

        setSummary(statusData); // ✅ IMPORTANT
        setIsCheckedIn(statusData.attendance_status);
      } catch (error) {
        console.error("Failed to load attendance status");
      }
    };

    loadData();
  }, []);

  // ✅ Get Location
  const getLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const handleAttendance = async () => {
    try {
      setLoading(true);

      const position = await getLocation();

      const payload = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      if (isCheckedIn) {
        await stopAttendance(payload);
      } else {
        await startAttendance(payload);
      }

      // Refresh status after attendance change
      const updatedStatus = await fetchAttendanceStatus();
      setSummary(updatedStatus);
      setIsCheckedIn(updatedStatus.attendance_status);

    } catch (error) {
      alert("Location permission required");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Topbar />

        <Cards
          summary={summary}
          isCheckedIn={isCheckedIn}
          loading={loading}
          onAttendanceClick={handleAttendance}
        />

        <Transactions />
      </div>
    </div>
  );
};