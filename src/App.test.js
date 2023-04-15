import { render, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import BookReducer, { fetchBooks } from "features/books/slice/BookSlice";
import App from "./App";

const mockBookData = {
    data: {
        totalItems: 3,
        items: [
            {
                id: "Wl-2DwAAQBAJ",
                volumeInfo: {
                    title: "GMAT Prep Plus 2021",
                    authors: ["Kaplan Test Prep"],
                    publisher: "Kaplan Publishing",
                    publishedDate: "2020-06-02",
                },
            },
            {
                id: "NYThDwAAQBAJ",
                volumeInfo: {
                    title: "GRE Prep Plus 2021",
                    authors: ["Kaplan Test Prep"],
                    publisher: "Simon and Schuster",
                    publishedDate: "2020-06-02",
                },
            },
            {
                id: "hRDADwAAQBAJ",
                volumeInfo: {
                    title: "Official Guide to OET",
                    authors: ["Kaplan Test Prep"],
                    publisher: "Simon and Schuster",
                    publishedDate: "2020-06-02",
                },
            },
        ],
    },
};

jest.mock("axios");

describe("Application Test", () => {
    let store;
    const home = global.window.location.href;

    beforeEach(() => {
        store = configureStore({ reducer: { books: BookReducer } });
    });

    afterEach(() => {
        cleanup();
        global.window.history.replaceState({}, "", decodeURIComponent(home));
    });

    const renderWithContext = (component) =>
        render(<Provider store={store}>{component}</Provider>);

    test("Should render without error", async () => {
        axios.get.mockResolvedValueOnce(mockBookData);
        await store.dispatch(fetchBooks());
        expect(() => renderWithContext(<App />)).not.toThrow();
    });

    test("Should have Sidebar, TopBar, Content Layouts", async () => {
        axios.get.mockResolvedValueOnce(mockBookData);
        await store.dispatch(fetchBooks());
        const { getByTestId, unmount } = renderWithContext(<App />);
        expect(getByTestId("sidebar-drawer")).toBeInTheDocument();
        expect(getByTestId("topbar")).toBeInTheDocument();
        expect(getByTestId("content")).toBeInTheDocument();
        await unmount();
    });

    test("Navigate to courses page, but show coming soon message", async () => {
        axios.get.mockResolvedValueOnce(mockBookData);
        await store.dispatch(fetchBooks());
        const { queryByText, unmount } = renderWithContext(<App />);
        const courses = queryByText(/courses/i);
        expect(courses).toBeInTheDocument();
        await userEvent.click(courses);
        await waitFor(
            () => { expect(queryByText(/Coming Soon/)).toBeInTheDocument(); },
            { interval: 1000, timeout: 5001 }
        );
        await unmount();
    });
});
