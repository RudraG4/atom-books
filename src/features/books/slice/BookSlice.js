import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchBooksApi from "../../../api/books";

/** Create Async Actions */
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await fetchBooksApi();
  return response;
});

const initialState = {
  error: null,
  status: "idle",
  total: 0,
  books: [],
  filteredBooks: [],
  searchTerm: ''
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    searchBook: (state, action) => {
      const searchTerm = action.payload;
      const filteredBooks = state.books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm?.toLowerCase())
      );
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
/** Actions from reducer */
export const { searchBook } = bookSlice.actions;

/** Books Reducer */
export default bookSlice.reducer;
