import { Button, CircularProgress } from "@mui/material";

interface Props {
  isCheckedIn: boolean;
  loading: boolean;
  onClick: () => void;
}

export const AttendanceButton = ({
  isCheckedIn,
  loading,
  onClick,
}: Props) => {
  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      sx={{
        mt: 4,
        py: 2,
        borderRadius: 3,
        fontSize: 18,
        backgroundColor: isCheckedIn ? "error.main" : "success.main",
      }}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : isCheckedIn ? (
        "Stop Attendance"
      ) : (
        "Start Attendance"
      )}
    </Button>
  );
};
