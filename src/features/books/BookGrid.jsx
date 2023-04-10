import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Search from "components/search/Search";
import { useErrorBoundary } from "react-error-boundary";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import BookCard from "./BookCard";
import {
  searchBook,
  getFilteredBooks,
  getStatus,
  getError,
} from "./slice/BookSlice";

export default function BookGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const books = useSelector(getFilteredBooks);
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const { showBoundary } = useErrorBoundary();

  const onSearch = useCallback(
    (searchValue) => {
      setSearchTerm(searchValue);
      dispatch(searchBook(searchValue));
    },
    [dispatch]
  );

  useEffect(() => {
    if (error) {
      showBoundary(error);
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <Box>
      <Box mb={3}>
        <Search onSearch={onSearch} />
      </Box>
      <Box mb={3}>
        <Typography variant="body1" fontWeight="600" color="text.secondary">
          {searchTerm ? `Results for '${searchTerm}'` : "All Books"}
        </Typography>
      </Box>
      <Box mb={3} display="flex" minHeight="250px">
        {status === "loading" && (
          <Box display="flex" justifyContent="center" m="auto">
            <Typography fontWeight="600" color="text.secondary">
              Loading Books...
            </Typography>
          </Box>
        )}
        {status === "error" && (
          <Box display="flex" justifyContent="center" m="auto">
            <Typography variant="body2" fontWeight="600" color="text.secondary">
              {error}
            </Typography>
          </Box>
        )}
        {status === "done" && !books.length && (
          <Box display="flex" justifyContent="center" m="auto">
            <Typography fontWeight="600" color="text.secondary">
              No Data
            </Typography>
          </Box>
        )}
        {status === "done" && !!books.length && (
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            data-testid="book-grid"
          >
            {books.map((book) => (
              <Grid item xs={12} md={6} key={book.id}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
