import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { GiAtom } from "react-icons/gi";

export default function Topbar() {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#fff",
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ minHeight: "54px !important" }}>
        <Link to="/">
          <Stack direction="row" alignItems="center" color="#1953d2">
            <GiAtom size="40px" />
            <Typography
              variant="h4"
              fontWeight="700"
              fontFamily="Quicksand,Roboto,Helvetica,Arial,sans-serif"
            >
              atom
            </Typography>
          </Stack>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
