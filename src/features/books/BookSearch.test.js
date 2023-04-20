import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Router } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";
import { createMemoryHistory } from "history";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "components/errorhandler/ErrorHandler";
import BookReducer, { fetchBooks } from "./slice/BookSlice";
import BookSearch from "./BookSearch";

const mockBookData = {
    data: {
        totalItems: 3,
        items: [
            {
                id: nanoid(),
                volumeInfo: {
                    title: "GRE Prep Plus 2021",
                    authors: ["Kaplan Test Prep"],
                    publisher: "Kaplan Publishing",
                    publishedDate: "2020-06-02",
                },
            },
            {
                id: nanoid(),
                volumeInfo: {
                    title: "GRE Prep Plus 2021",
                    authors: ["Kaplan Test Prep"],
                    publisher: "Kaplan Publishing",
                    publishedDate: "2020-06-02",
                },
            },
            {
                id: nanoid(),
                volumeInfo: {
                    title: "LoremIpsum",
                    authors: ["Kaplan"],
                    publisher: "Simson",
                    publishedDate: "2020-06-02",
                },
            },
        ],
    },
};

jest.mock("axios");

describe("BookSearch component", () => {
    let store;
    const orgConsoleError = console.error;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                books: BookReducer,
            },
        });
        console.error = jest.fn();
    });

    afterEach(() => {
        store = null;
        console.error = orgConsoleError;
        cleanup();
    });

    const renderWithContext = (component, initialEntries = ["/"]) => {
        const history = createMemoryHistory({ initialEntries });
        return {
            history,
            ...render(
                <Router location={history.location} navigator={history}>
                    <Provider store={store}>
                        <ErrorBoundary fallbackRender={ErrorHandler}>
                            {component}
                        </ErrorBoundary>
                    </Provider>
                </Router>
            ),
        };
    };

    test("Should render without error, fetch books and load the datagrid", async () => {
        axios.get.mockResolvedValueOnce(mockBookData);
        store.dispatch(fetchBooks());

        renderWithContext(<BookSearch />);

        expect(screen.queryByText(/^Books$/i)).toBeInTheDocument();
        expect(screen.queryByText(/^Create New Book$/i)).toBeInTheDocument();
        expect(screen.queryByTestId("loading")).toBeInTheDocument();

        await waitFor(() => {
            expect(store.getState().books.books.length).not.toBe(0);
            expect(store.getState().books.status).toBe("done");
            expect(store.getState().books.error).toBeNull();
        }, { interval: 1000, timeout: 5000 });

        const bookGrid = screen.queryByTestId("data-grid");
        expect(bookGrid).not.toBeNull();
        expect(bookGrid.children.length).toBe(3);

        expect(screen.queryAllByText("GRE Prep Plus 2021").length).toBe(2);
        expect(screen.queryAllByText(/Kaplan Test Prep/).length).toBe(2);
        expect(screen.queryAllByText("LoremIpsum").length).toBe(1);
    });

    test("Should able to filter records by title, author, publisher", async () => {
        axios.get.mockResolvedValueOnce(mockBookData);
        await store.dispatch(fetchBooks());

        renderWithContext(<BookSearch />);

        let bookGrid = screen.queryByTestId("data-grid");
        expect(bookGrid).not.toBeNull();
        expect(bookGrid.children.length).toBe(3);

        const searchInput = screen.getByPlaceholderText(/Search/i);
        await userEvent.type(searchInput, "GRE");
        await waitFor(
            () => {
                bookGrid = screen.queryByTestId("data-grid");
                expect(bookGrid.children.length).toBe(2);
                expect(screen.queryByText("Results for 'GRE'")).toBeInTheDocument();
            },
            { interval: 1000, timeout: 2001 }
        );

        await userEvent.clear(searchInput);
        await userEvent.type(searchInput, "Simson");
        await waitFor(
            () => {
                bookGrid = screen.queryByTestId("data-grid");
                expect(bookGrid.children.length).toBe(1);
                expect(screen.queryByText("Results for 'Simson'")).toBeInTheDocument();
            },
            { interval: 1000, timeout: 2001 }
        );

        await userEvent.clear(searchInput);
        await userEvent.type(searchInput, "Kaplan Test Prep");
        await waitFor(
            () => {
                bookGrid = screen.queryByTestId("data-grid");
                expect(bookGrid.children.length).toBe(2);
                expect(screen.queryByText("Results for 'Kaplan Test Prep'")).toBeInTheDocument();
            },
            { interval: 1000, timeout: 2001 }
        );
    });

    test("Should render Error Boundary Fallback component", async () => {
        axios.get.mockRejectedValueOnce({ message: "500 internal server error" });
        store.dispatch(fetchBooks());

        renderWithContext(<BookSearch />);

        await waitFor(() => expect(screen.queryByText(/Something went wrong/)).toBeInTheDocument());

        const tryAgainButton = screen.queryByText(/Try Again/i);
        expect(tryAgainButton).toBeInTheDocument();
        await userEvent.click(tryAgainButton);
        expect(screen.queryByText(/No Data|Loading/i)).toBeInTheDocument();
    });
});
