import Stack from "@mui/material/Stack";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "components/errorhandler/ErrorHandler";
import Topbar from "components/topbar/Topbar";
import Sidebar from "components/sidebar/Sidebar";
import Content from "./Content";

export default function MainLayout() {
  const onReset = () => {
    window.location.reload();
  };

  return (
    <Stack direction="row" sx={{ height: "100%", maxHeight: "100vh" }}>
      <Sidebar data-testid="sidebar" />
      <Stack direction="column" flexGrow="1">
        <Topbar data-testid="topbar" />
        <ErrorBoundary fallbackRender={ErrorHandler} onReset={onReset}>
          <Content data-testid="content" />
        </ErrorBoundary>
      </Stack>
    </Stack>
  );
}
