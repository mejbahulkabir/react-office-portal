import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();

  return (
    <AppBar
      position="static"
      sx={{ background: "white", color: "black", boxShadow: 1 }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Office Portal
        </Typography>

        <Button
          variant="outlined"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
