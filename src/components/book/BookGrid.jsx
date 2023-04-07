import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import getBooks from "../../api/books";

export default function BookGrid() {
  const [books, setBooks] = useState({
    total: 0, results: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getBooks();
      setBooks(response);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center">
        <p>Loading....</p>
      </Grid>
    );
  }

  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {books.results?.map((book) => (
        <Grid item xs={12} md={6} key={book.id}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
}
