import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import SidebarListItemButton from "./SidebarListItemButton";
import SidebarListItemIcon from "./SidebarListItemIcon";

function SidebarItem(props) {
    const { item } = props;

    if (!item) {
        throw new Error("SidebarItem requires an 'item' prop");
    }

    if (!item.path || !item.icon || !item.label) {
        throw new Error("SidebarItem's item prop is missing mandatory fields");
    }

    return (
        <SidebarListItemButton
            component={NavLink}
            to={item.path}
            data-testid="sidebar-item"
        >
            <SidebarListItemIcon data-testid="sidebar-item-icon">
                {item.icon}
            </SidebarListItemIcon>
            <ListItemText
                data-testid="sidebar-item-label"
                primary={<Typography variant="body2">{item.label}</Typography>}
            />
        </SidebarListItemButton>
    );
}

SidebarItem.propTypes = {
    item: PropTypes.shape({
        path: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.element.isRequired,
    }).isRequired,
};

export default SidebarItem;
