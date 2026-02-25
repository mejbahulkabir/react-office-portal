import { FiPower } from 'react-icons/fi';
import type { AttendanceStatus } from '../types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

interface CardsProps {
  summary: AttendanceStatus | null;
  isCheckedIn: boolean;
  loading: boolean;
  onAttendanceClick: () => void;
}

const Cards = ({ summary, isCheckedIn, loading, onAttendanceClick }: CardsProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  const user = useSelector((state: RootState) => state.auth.user);
  const formatedDate = formatDate(summary?.check_in ?? '-');
  return (
    <div className="cards-wrapper">
      <div className="row g-4">
        {/* Card 1 */}
        <div className="col-md-4">
          <div className="custom-card green-card d-flex align-items-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&auto=format&fit=crop"
              alt="Profile"
              className="profile-avatar"
            />

            <div className="ms-3">
              <h5 className="fw-bold mb-1">{user?.name || 'Guest User'}</h5>

              <p className="text-muted mb-0">{user?.email || 'No email found'}</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4">
          <div className="custom-card orange-card">
            <h6>Last check in date and time</h6>
            <h4>{formatedDate}</h4>
            <small>Current Month</small>
          </div>
        </div>

        {/* Attendance Button */}
        <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
          <button
            className={`attendance-btn ${isCheckedIn ? 'checked-in' : 'checked-out'}`}
            onClick={onAttendanceClick}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm text-light" />
            ) : (
              <FiPower size={42} />
            )}
          </button>

          <div className="mt-3 fw-semibold">
            {isCheckedIn ? (
              <span className="text-success">Checked In</span>
            ) : (
              <span className="text-danger">Checked Out</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
