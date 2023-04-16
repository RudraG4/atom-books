import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useErrorBoundary } from "react-error-boundary";
import { useState, useEffect, useCallback } from "react";
import Search from "components/search/Search";
import Loader from "components/loader/Loader";
import BookCard from "../BookCard/BookCard";
import useBooks from "../../hooks/useBooks";
import { searchBook } from "../../slice/BookSlice";

export default function BookGrid() {
    const [searchTerm, setSearchTerm] = useState("");
    const { dispatch, books, status, error } = useBooks();
    const { showBoundary } = useErrorBoundary();

    const onSearch = useCallback((searchValue) => {
        setSearchTerm(searchValue);
        dispatch(searchBook(searchValue));
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            showBoundary(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Search
                    onSearch={onSearch}
                    placeholder="Search title, author, publisher"
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" fontWeight="600" color="text.secondary">
                    {searchTerm ? `Results for '${searchTerm}'` : "All Books"}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} data-testid="book-grid">

                    {(status === "loading") && (
                        <Loader height={250} />
                    )}

                    {status === "error" && (
                        <Box display="flex" alignItems="center" justifyContent="center" height={250} width="100%">
                            <Typography variant="body2" fontWeight="600" color="text.secondary">
                                {error}
                            </Typography>
                        </Box>
                    )}

                    {status === "done" && !books.length && (
                        <Box display="flex" alignItems="center" justifyContent="center" height={250} width="100%">
                            <Typography fontWeight="600" color="text.secondary">
                                No Data
                            </Typography>
                        </Box>
                    )}

                    {status === "done" && !!books.length && (
                        books.map((book) => (
                            <Grid item xs={12} md={6} key={book.id}>
                                <BookCard book={book} />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}
