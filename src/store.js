import { configureStore } from "@reduxjs/toolkit";
import BookReducer from "features/books/slice/BookSlice";

const store = configureStore({
    reducer: {
        books: BookReducer,
    },
});

export default store;
