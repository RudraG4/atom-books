import { useState } from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { nanoid } from "nanoid";
import SidebarItem from "./SidebarItem";
import SidebarListItemButton from "./SidebarListItemButton";
import SidebarListItemIcon from "./SidebarListItemIcon";

function SidebarItemCollapsable(props) {
  const [open, setOpen] = useState(false);
  const { item } = props;

  const handleToggleCollapse = () => {
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
    <>
      <SidebarListItemButton onClick={handleToggleCollapse}>
        <SidebarListItemIcon>{item.icon}</SidebarListItemIcon>
        <ListItemText
          primary={<Typography variant="body2">{item.label}</Typography>}
        />
        {open ? <MdExpandLess /> : <MdExpandMore />}
      </SidebarListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {generateMenuItems(item.children)}
        </List>
      </Collapse>
    </>
  );
}

SidebarItemCollapsable.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.element,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.element,
      })
    ),
  }).isRequired,
};

export default SidebarItemCollapsable;
