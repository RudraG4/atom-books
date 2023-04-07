import { Typography } from '@mui/material';
import { Card, CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	color: theme.palette.text.secondary,
	borderLeft: '4px solid #ffa500'
}));

const BookCard = ({ book }) => {
	if (!book) return;

	return (
		<StyledCard>
			<CardActionArea sx={{ padding: '1.05rem' }} component={Link} to={`/book/${book.id}`}>
				<Typography variant="h6" fontSize="1rem" fontWeight="600">
					{book.title}
				</Typography>
				<Typography variant="body2">{`Authors: ${book.authors}`}</Typography>
				<Typography variant="body2">{`Publisher: ${book.publisher}`}</Typography>
				<Typography variant="body2">{`Published Date: ${book.publishedDate}`}</Typography>
			</CardActionArea>
		</StyledCard>
	);
};

export default BookCard;
