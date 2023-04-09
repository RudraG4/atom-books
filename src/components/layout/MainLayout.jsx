import Stack from "@mui/material/Stack";
import Topbar from "components/topbar/Topbar";
import Sidebar from "components/sidebar/Sidebar";
import Content from "./Content";

export default function MainLayout() {
  return (
    <Stack direction="row" sx={{ height: "100%", maxHeight: "100vh" }}>
      <Sidebar data-testid="sidebar" />
      <Stack direction="column" flexGrow="1">
        <Topbar data-testid="topbar" />
        <Content data-testid="content" />
      </Stack>
    </Stack>
  );
}
