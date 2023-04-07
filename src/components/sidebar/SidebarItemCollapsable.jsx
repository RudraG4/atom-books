import { useState } from 'react';
import { List, ListItemText, Collapse, Typography } from '@mui/material';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import SidebarItem from './SidebarItem';
import SidebarListItemButton from './SidebarListItemButton';
import SidebarListItemIcon from './SidebarListItemIcon';

export default function SidebarItemCollapsable({ item }) {
	const [open, setOpen] = useState(false);
	const { label, icon, children } = item;

	if (!label || !icon || !children) return;

	const handleToggleCollapse = () => {
		setOpen(!open);
	};

	return (
		<>
			<SidebarListItemButton onClick={handleToggleCollapse}>
				<SidebarListItemIcon>{icon}</SidebarListItemIcon>
				<ListItemText primary={<Typography variant="body2">{label}</Typography>} />
				{open ? <MdExpandLess /> : <MdExpandMore />}
			</SidebarListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{children?.map((child, index) => {
						const { path, label, icon, children } = child;
						return children ? (
							<SidebarItemCollapsable key={index} item={child} />
						) : (
							<SidebarItem key={index} item={{ path, label, icon }} />
						);
					})}
				</List>
			</Collapse>
		</>
	);
}
