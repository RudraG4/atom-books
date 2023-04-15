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
          publisher: "Kaplan Publishing",
          publishedDate: "2020-06-02",
        },
      },
    ],
  },
};

jest.mock("axios");

describe("BookSearch component", () => {
  const orgConsoleError = console.error;

  let store;

  beforeEach(() => {
    console.error = jest.fn();
    store = configureStore({
      reducer: {
        books: BookReducer,
      },
    });
  });

  afterEach(() => {
    console.error = orgConsoleError;
    store = null;
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

  test("Should render without error", () => {
    expect(() => renderWithContext(<BookSearch />)).not.toThrow();
  });

  test("Should fetch books and load the datagrid", async () => {
    renderWithContext(<BookSearch />);

    expect(screen.getByText(/^Books$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Create New Book$/i)).toBeInTheDocument();

    expect(screen.getByText(/^No Data$/i)).toBeInTheDocument();
    expect(screen.queryByText(/^Loading Books...$/i)).not.toBeInTheDocument();

    axios.get.mockResolvedValueOnce(mockBookData);
    await store.dispatch(fetchBooks());

    expect(store.getState().books.books.length).not.toBe(0);
    expect(store.getState().books.status).toBe("done");
    expect(store.getState().books.error).toBeNull();

    const bookGrid = screen.queryByTestId("book-grid");
    expect(bookGrid).not.toBeNull();
    expect(bookGrid.children.length).toBe(3);
    expect(screen.queryAllByText("GRE Prep Plus 2021").length).toBe(2);
    expect(screen.queryAllByText(/Kaplan Test Prep/).length).toBe(2);
    expect(screen.queryAllByText("LoremIpsum").length).toBe(1);
  });

  test("Should able to filter records with searchterm 'GRE' ", async () => {
    axios.get.mockResolvedValueOnce(mockBookData);
    await store.dispatch(fetchBooks());

    renderWithContext(<BookSearch />);

    const bookGrid = screen.queryByTestId("book-grid");
    expect(bookGrid).not.toBeNull();
    expect(bookGrid.children.length).toBe(3);

    const searchInput = screen.getByPlaceholderText(/Search/i);
    await userEvent.type(searchInput, "GRE");
    await waitFor(
      () => {
        expect(bookGrid.children.length).toBe(2);
        expect(screen.queryByText("Results for 'GRE'")).toBeInTheDocument();
      },
      { interval: 1000, timeout: 2001 }
    );
  });

  test("Should render Error Boundary Fallback component", async () => {
    axios.get.mockRejectedValueOnce({ message: "500 internal server error" });
    await store.dispatch(fetchBooks());

    renderWithContext(<BookSearch />);

    expect(screen.queryByText(/Something went wrong/)).toBeInTheDocument();
    const tryAgainButton = screen.queryByText(/Try Again/i);
    expect(tryAgainButton).toBeInTheDocument();

    await userEvent.click(tryAgainButton);

    expect(screen.queryByText(/No Data|Loading/i)).toBeInTheDocument();
  });
});
