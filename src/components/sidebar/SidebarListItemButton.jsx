import { ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const SidebarListItemButton = styled(ListItemButton, {
	shouldForwardProp: (prop) => true
})((props) => ({
	padding: '6px'
}));

export default SidebarListItemButton;
