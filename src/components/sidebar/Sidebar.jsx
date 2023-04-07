import { useState } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';
import { HiMenuAlt2 } from 'react-icons/hi';
import SidebarItem from './SidebarItem';
import SidebarItemCollapsable from './SidebarItemCollapsable';
import { appRoutes } from '@routes';

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	'& .MuiDrawer-paper': {
		position: 'relative',
		whiteSpace: 'nowrap',
		overflowX: 'hidden',
		color: 'rgb(50 51 51 / 54%)',
		fontWeight: 400,
		width: 300,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		boxSizing: 'border-box',
		...(!open && {
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			width: theme.spacing(7)
		}),
		[theme.breakpoints.down('sm')]: {
			...(open && {
				position: 'absolute'
			})
		}
	}
}));

const StyledIconButton = styled(IconButton)(() => ({
	minWidth: '40px',
	justifyContent: 'center',
	marginRight: '10px'
}));

const StyledToolbar = styled(Toolbar)((props) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	padding: '6px !important',
	minHeight: '54px !important',
	height: '54px'
}));

export default function Sidebar() {
	const [open, setOpen] = useState(false);

	const onToggle = () => {
		setOpen(!open);
	};

	const generateMenuItems = () => {
		return appRoutes.map((route, index) => {
			const { path, label, icon, children } = route;
			return children ? (
				<SidebarItemCollapsable item={route} key={index} />
			) : (
				<SidebarItem item={{ path, label, icon }} key={index} />
			);
		});
	};

	return (
		<Drawer variant="permanent" open={open}>
			<StyledToolbar>
				<StyledIconButton onClick={onToggle}>
					<HiMenuAlt2 size={20} />
				</StyledIconButton>
				<Typography variant="body2">MENU</Typography>
			</StyledToolbar>
			<List component="nav">{generateMenuItems()}</List>
		</Drawer>
	);
}