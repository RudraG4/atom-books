import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_BOOK_URL = "https://www.googleapis.com/books/v1/volumes";

/** Create Async Actions */
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(`${BASE_BOOK_URL}?q=kaplan%20test%20prep`);
  let result = { total: 0, results: [] };
  if (response?.data?.items?.length) {
    result = {
      total: response.data.totalItems || 0,
      results: response.data.items?.map((book) => ({
        id: book.id,
        title: book.volumeInfo?.title,
        authors: book.volumeInfo?.authors.join(","),
        publisher: book.volumeInfo?.publisher,
        publishedDate: book.volumeInfo?.publishedDate,
      })),
    };
  }
  return result;
});

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (bookId) => {
    const response = await axios.get(`${BASE_BOOK_URL}/${bookId}`);
    if (response?.data) {
      const book = response?.data;
      const volumeInfo = book.volumeInfo || {};
      const isbns =
        volumeInfo.industryIdentifiers
          ?.filter((ident) => ident.type.includes("ISBN"))
          .map((_iden) => _iden.identifier)
          .join(", ") || "";
      const bookCover =
        volumeInfo.imageLinks?.medium || volumeInfo.imageLinks?.thumbnail;
      return {
        id: book.id,
        title: volumeInfo.title,
        subtitle: volumeInfo.subtitle,
        authors: volumeInfo.authors?.join(",") || "",
        publisher: volumeInfo.publisher,
        publishedDate: volumeInfo.publishedDate,
        isbns,
        pageCount: volumeInfo.pageCount,
        bookCover,
        description: volumeInfo.description,
      };
    }
    return null;
  }
);

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
