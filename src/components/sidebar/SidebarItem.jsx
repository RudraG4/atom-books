import { NavLink } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import SidebarListItemButton from './SidebarListItemButton';
import SidebarListItemIcon from './SidebarListItemIcon';

export default function SidebarItem({ item }) {
	const { label, icon, path } = item;

	if (!path || !label || !icon) return;

	return (
		<SidebarListItemButton component={NavLink} to={path}>
			<SidebarListItemIcon>{icon}</SidebarListItemIcon>
			<ListItemText primary={<Typography variant="body2">{label}</Typography>} />
		</SidebarListItemButton>
	);
}
