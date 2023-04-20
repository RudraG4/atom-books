import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useErrorBoundary } from "react-error-boundary";
import { useState, useEffect, useCallback } from "react";
import Search from "components/search/Search";
// import Loader from "components/loader/Loader";
import DataGrid from "components/grid/DataGrid";
import BookCard from "../BookCard/BookCard";
import useBooks from "../../hooks/useBooks";

function BookCardRenderer(book) {
    return <BookCard book={book} />;
}

export default function BookGrid() {
    const [searchTerm, setSearchTerm] = useState("");
    const { books, status, error } = useBooks(searchTerm);
    const { showBoundary } = useErrorBoundary();

    const onSearch = useCallback((searchValue) => setSearchTerm(searchValue), []);

    useEffect(() => {
        if (!error) return;

        showBoundary(error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Search onSearch={onSearch} placeholder="Search title, author, publisher" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" fontWeight="600" color="text.secondary">
                    {searchTerm ? `Results for '${searchTerm}'` : "All Books"}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <DataGrid
                    status={status}
                    error={error}
                    results={books}
                    itemRenderer={BookCardRenderer}
                />
            </Grid>
        </Grid>
    );
}
