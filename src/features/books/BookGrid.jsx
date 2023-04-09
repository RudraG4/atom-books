import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import BookCard from "./BookCard";
import { getFilteredBooks, getStatus, getError } from "./slice/BookSlice";

export default function BookGrid() {
  const books = useSelector(getFilteredBooks);
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (error) {
      showBoundary(error);
    }
    // eslint-disable-next-line
  }, [error]);

  if (status === "loading") {
    return (
      <Grid container justifyContent="center">
        <Typography fontWeight="600" color="text.secondary">
          Loading Books...
        </Typography>
      </Grid>
    );
  }

  if (status === "error") {
    return (
      <Grid container justifyContent="center">
        <Typography fontWeight="600" color="text.secondary">
          {error}
        </Typography>
      </Grid>
    );
  }

  if (!books.length) {
    return (
      <Grid container justifyContent="center">
        <Typography fontWeight="600" color="text.secondary">
          No Data
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {books.map((book) => (
        <Grid item xs={12} md={6} key={book.id}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
}
