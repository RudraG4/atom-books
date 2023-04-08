import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BOOK_URL =
  "https://www.googleapis.com/books/v1/volumes?q=kaplan%20test%20prep";

/** Create Async Actions */
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(BOOK_URL);
  const result = {
    total: response.data.totalItems || 0,
    results: response.data.items?.map((book) => ({
      id: book.id,
      title: book.volumeInfo?.title,
      authors: book.volumeInfo?.authors.join(","),
      publisher: book.volumeInfo?.publisher,
      publishedDate: book.volumeInfo?.publishedDate,
    })),
  };
  return result;
});

const initialState = {
  error: null,
  status: "idle",
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
        filteredBooks = state.books.filter((book) =>
          book.title.toLowerCase().includes(searchTerm?.toLowerCase())
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
