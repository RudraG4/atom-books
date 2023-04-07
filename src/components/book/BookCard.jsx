import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  color: theme.palette.text.secondary,
  borderLeft: "4px solid #ffa500",
}));

function BookCard(props) {
  const { book } = props;

  return (
    <StyledCard>
      <CardActionArea
        sx={{
          padding: "1.05rem",
        }}
        component={Link}
        to={`/book/${book.id}`}
      >
        <Typography variant="h6" fontSize="1rem" fontWeight="600">
          {book.title}
        </Typography>
        <Typography variant="body2">{`Authors: ${book.authors}`}</Typography>
        <Typography variant="body2">{`Publisher: ${book.publisher}`}</Typography>
        <Typography variant="body2">{`Published Date: ${book.publishedDate}`}</Typography>
      </CardActionArea>
    </StyledCard>
  );
}

BookCard.propTypes = {
  book: PropTypes.isRequired,
};

export default BookCard;
