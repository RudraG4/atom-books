import { ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';

const SidebarListItemIcon = styled(ListItemIcon, {
	shouldForwardProp: (prop) => true
})((props) => ({
	minWidth: '40px',
	justifyContent: 'center',
	marginRight: '10px'
}));

export default SidebarListItemIcon;
