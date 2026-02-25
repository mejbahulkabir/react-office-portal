import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children }: any) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box sx={{ p: 4, background: "#f4f6f8", minHeight: "100vh" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
