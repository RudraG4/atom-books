import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

export default function Content() {
  const mainStyle = {
    minHeight: "calc(100vh - 54px)",
    padding: "24px",
    background: "#f9f9f9",
    overflow: "auto",
  };
  return (
    <Box component="main" sx={mainStyle} data-testid="content">
      <Outlet />
    </Box>
  );
}
