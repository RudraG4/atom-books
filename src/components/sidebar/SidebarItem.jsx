import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import SidebarListItemButton from "./SidebarListItemButton";
import SidebarListItemIcon from "./SidebarListItemIcon";

function SidebarItem(props) {
  const { item } = props;

  return (
    <SidebarListItemButton component={NavLink} to={item.path}>
      <SidebarListItemIcon>{item.icon}</SidebarListItemIcon>
      <ListItemText
        primary={<Typography variant="body2">{item.label}</Typography>}
      />
    </SidebarListItemButton>
  );
}

SidebarItem.propTypes = {
  item: PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.element,
  }).isRequired,
};

export default SidebarItem;
