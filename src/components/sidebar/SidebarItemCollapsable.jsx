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
  // const { label, icon, children } = item;

  // if (!label || !icon || !children) return;

  const handleToggleCollapse = () => {
    setOpen(!open);
  };

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
          {item.children?.map((child) => {
            const { path, label, icon, children } = child;
            const key = nanoid();
            return children ? (
              <SidebarItemCollapsable key={key} item={child} />
            ) : (
              <SidebarItem
                key={key}
                item={{
                  path,
                  label,
                  icon,
                }}
              />
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

SidebarItemCollapsable.propTypes = {
  item: PropTypes.isRequired,
};

export default SidebarItemCollapsable;
