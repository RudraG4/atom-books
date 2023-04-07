import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import styled from '@mui/material/styles/styled';
import { BiSearch } from 'react-icons/bi';

const StyledTextField = styled(TextField)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		'&.MuiTextField-root': {
			width: '100%'
		}
	},
	[theme.breakpoints.up('md')]: {
		'&.MuiTextField-root': {
			width: '50%'
		}
	}
}));

export default function Search() {
	return (
		<StyledTextField
			variant="standard"
			placeholder="Search"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<BiSearch color="text.primary" />
					</InputAdornment>
				)
			}}
		/>
	);
}
