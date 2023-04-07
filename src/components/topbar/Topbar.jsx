import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import config from '@config';

export default function Topbar() {
	return (
		<AppBar
			position="sticky"
			sx={{
				background: '#fff',
				color: 'rgba(0, 0, 0, 0.87)',
				boxShadow: 'none'
			}}
		>
			<Toolbar sx={{ minHeight: '54px !important' }}>
				<Typography
					variant="h4"
					color="#2b2bbf"
					fontWeight="600"
					component={NavLink}
					to="/"
				>
					{config.appName}
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
