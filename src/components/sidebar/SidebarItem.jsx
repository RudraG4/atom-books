import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import SidebarListItemButton from "./SidebarListItemButton";
import SidebarListItemIcon from "./SidebarListItemIcon";

function SidebarItem(props) {
  const { item } = props;

  const { label, icon, path } = item;

  // if (!path || !label || !icon) return;

  return (
    <SidebarListItemButton component={NavLink} to={path}>
      <SidebarListItemIcon>{icon}</SidebarListItemIcon>
      <ListItemText
        primary={<Typography variant="body2">{label}</Typography>}
      />
    </SidebarListItemButton>
  );
}

SidebarItem.propTypes = {
  item: PropTypes.isRequired,
};

export default SidebarItem;
