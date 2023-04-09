import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import Topbar from "components/topbar/Topbar";
import Sidebar from "components/sidebar/Sidebar";

export default function MainLayout() {
  return (
    <Stack direction="row" sx={{ height: "100%", maxHeight: "100vh" }}>
      <Sidebar />
      <Stack direction="column" flexGrow="1">
        <Topbar />
        <Box
          component="main"
          sx={{
            minHeight: "calc(100vh - 54px)",
            padding: "24px",
            background: "#f9f9f9",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
}
