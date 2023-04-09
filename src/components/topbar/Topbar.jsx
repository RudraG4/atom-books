import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { GiAtom } from "react-icons/gi";

export default function Topbar() {
  const appBarStyle = {
    background: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "none",
  };

  return (
    <AppBar position="sticky" sx={appBarStyle}>
      <Toolbar sx={{ minHeight: "54px !important" }}>
        <Link to="/">
          <Stack direction="row" alignItems="center" color="#1953d2">
            <GiAtom size="40px" data-testid="atom-icon" />
            <Typography
              variant="h4"
              fontWeight="700"
              fontFamily="Quicksand,Roboto"
            >
              atom
            </Typography>
          </Stack>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
