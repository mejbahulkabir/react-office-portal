import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";
import { useState } from "react";
import "../../../styles/dashboard.css";

export default function LoginPage() {
  const dispatch = useDispatch<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    dispatch(login({ email, password }));
  };

  return (
    <Box className="login-container">
      <Paper className="login-card" elevation={0}>
        <Typography variant="h4" fontWeight={600} mb={1} sx={{ color: "#000" }}>
          Welcome Back 👋
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Please login to your account
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          className="login-btn"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}