import Button from "@mui/material/Button";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch } from "react-redux";
import PageContainer from "components/pagecontainer/PageContainer";
import ErrorHandler from "components/errorhandler/ErrorHandler";
import PageHeader from "components/pageheader/PageHeader";
import BookGrid from "./components/BookGrid/BookGrid";
import { fetchBooks } from "./slice/BookSlice";

export default function BookSearch() {
    const dispatch = useDispatch();

    const onReset = () => {
        dispatch(fetchBooks());
    };

    return (
        <PageContainer>
            <PageHeader
                title="Books"
                endAdornment={(
                    <Button variant="contained" size="medium" sx={{ textTransform: "capitalize" }}>
                        Create New Book
                    </Button>
                )}
            />
            <ErrorBoundary fallbackRender={ErrorHandler} onReset={onReset}>
                <BookGrid />
            </ErrorBoundary>
        </PageContainer>
    );
}
