import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Search from "../../components/search/Search";
import BookGrid from "./components/BookGrid";
import ErrorHandler from "./components/ErrorHandler";
import { fetchBooks, searchBook } from "./slice/BookSlice";

export default function BookSearch() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = (searchValue) => {
    setSearchTerm(searchValue);
    dispatch(searchBook(searchValue));
  };

  const onReset = () => {
    dispatch(fetchBooks());
  };

  return (
    <Container maxWidth="lg" sx={{ px: "0 !important" }}>
      <Box mb={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" component="h4" fontWeight="600">
            Books
          </Typography>
          <Button
            variant="contained"
            size="medium"
            sx={{ textTransform: "capitalize" }}
          >
            Create New Book
          </Button>
        </Stack>
      </Box>
      <Box mb={3}>
        <Search onSearch={onSearch} />
      </Box>
      <Box mb={3}>
        <Typography variant="body1" fontWeight="600" color="text.secondary">
          {searchTerm ? `Results for '${searchTerm}'` : "All Books"}
        </Typography>
      </Box>
      <Box mb={2}>
        <ErrorBoundary fallbackRender={ErrorHandler} onReset={onReset}>
          <BookGrid />
        </ErrorBoundary>
      </Box>
    </Container>
  );
}
