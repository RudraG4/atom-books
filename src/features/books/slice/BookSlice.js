import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BooksAPI from "api/books";

/** Create Async Actions */
export const fetchBooks = createAsyncThunk("books/fetchBooks", () => BooksAPI.fetchBooks());

export const fetchBookById = createAsyncThunk("books/fetchBookById", (bookId) => BooksAPI.fetchBookById(bookId));

const initialState = {
    error: null,
    status: "done",
    total: 0,
    books: [],
    filteredBooks: [],
    searchTerm: "",
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        searchBook: (state, action) => {
            const searchTerm = action.payload;
            let filteredBooks;
            if (searchTerm) {
                filteredBooks = state.books.filter(
                    (book) =>
                        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        book.authors?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        book.publisher?.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else {
                filteredBooks = state.books;
            }
            return { ...state, filteredBooks, searchTerm };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => ({
                ...state,
                status: "loading",
                error: null,
            }))
            .addCase(fetchBooks.fulfilled, (state, action) => ({
                ...state,
                status: "done",
                error: null,
                books: action.payload.results,
                filteredBooks: action.payload.results,
                total: action.payload.total,
            }))
            .addCase(fetchBooks.rejected, (state, action) => ({
                ...state,
                status: "error",
                error: action.error.message,
                books: [],
                filteredBooks: [],
                total: 0,
            }));
    },
});

/** Books Selector */
export const getTotal = (state) => state.books.total;
export const getBooks = (state) => state.books.books;
export const getStatus = (state) => state.books.status;
export const getError = (state) => state.books.error;
export const getFilteredBooks = (state) => state.books.filteredBooks;

/** Actions from reducers */
export const { searchBook } = bookSlice.actions;

/** Books Reducer */
export default bookSlice.reducer;
