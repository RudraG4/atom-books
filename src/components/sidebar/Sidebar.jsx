import { useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { HiMenuAlt2 } from "react-icons/hi";
import { nanoid } from "nanoid";
import { appRoutes } from "routes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapsable from "./SidebarItemCollapsable";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    overflowX: "hidden",
    color: theme.palette.text.secondary,
    fontWeight: 400,
    width: 300,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
    }),
    [theme.breakpoints.down("sm")]: {
      ...(open && {
        position: "absolute",
      }),
    },
  },
}));

const StyledIconButton = styled(IconButton)(() => ({
  minWidth: "40px",
  justifyContent: "center",
  marginRight: "10px",
}));

const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "6px !important",
  minHeight: "54px !important",
  height: "54px",
}));

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen(!open);
  };

  const generateMenuItems = (routes) =>
    routes?.map((route) => {
      const { label, children, path } = route;

      if (!label) return null;

      if (children) {
        return <SidebarItemCollapsable key={nanoid()} item={route} />;
      }

      if (!path) return null;

      return <SidebarItem key={nanoid()} item={route} />;
    });

  return (
    <Drawer
      variant="permanent"
      open={open}
      data-testid="sidebar-drawer"
      className={`${open ? "is-open" : ""}`}
    >
      <StyledToolbar onClick={onToggle} data-testid="sidebar-menu">
        <StyledIconButton>
          <HiMenuAlt2 size={20} />
        </StyledIconButton>
        <Typography variant="body2">MENU</Typography>
      </StyledToolbar>
      <List component="nav" data-testid="sidebar-nav">
        {generateMenuItems(appRoutes)}
      </List>
    </Drawer>
  );
}
