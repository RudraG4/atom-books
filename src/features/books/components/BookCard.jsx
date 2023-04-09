import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
  color: theme.palette.text.secondary,
  borderLeft: "4px solid #ffa839",
}));

function BookCard(props) {
  const { book } = props;

  if (!book) {
    throw new Error("BookCard is requires 'book' prop");
  }

  if (!book.id || !book.title) {
    throw new Error("BookCard's book prop is missing mandatory fields");
  }

  return (
    <StyledCard>
      <CardActionArea
        sx={{ padding: "1.05rem" }}
        component={Link}
        to={`/book/${book.id}`}
      >
        <Typography fontSize="1rem" fontWeight="600" data-testid="title">
          {book.title}
        </Typography>
        <Typography variant="body2" data-testid="authors">
          {`Authors: ${book.authors}`}
        </Typography>
        <Typography variant="body2" data-testid="publisher">
          {`Publisher: ${book.publisher}`}
        </Typography>
        <Typography variant="body2" data-testid="publisheddate">
          {`Published Date: ${book.publishedDate}`}
        </Typography>
      </CardActionArea>
    </StyledCard>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string,
    publisher: PropTypes.string,
    publishedDate: PropTypes.string,
  }).isRequired,
};

BookCard.defaultProps = {
  authors: "Unknown Authors",
  publisher: "Unknown Publisher",
};

export default BookCard;
