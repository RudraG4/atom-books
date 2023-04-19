import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import React from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: "#fff",
    color: theme.palette.text.secondary,
    borderLeft: "4px solid #ffa839",
}));

function BookCard(props) {
    const { book } = props;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    if (!book) {
        throw new Error("BookCard requires a 'book' prop");
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
                <Grid container spacing={2}>
                    <Grid item flexGrow="1">
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
                    </Grid>
                    <Grid item>
                        {matches && (
                            <Box>
                                <Box
                                    component="img"
                                    sx={{
                                        width: "80px",
                                        height: "100%",
                                        verticalAlign: "middle"
                                    }}
                                    alt={book.title}
                                    src={book.images.thumbnail}
                                />
                            </Box>
                        )}
                    </Grid>
                </Grid>
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

export default React.memo(BookCard);
