import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "nanoid";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "components/errorhandler/ErrorHandler";
import { createMemoryHistory } from "history";
import BookSearch from "./BookSearch";
import BookReducer, { fetchBooks } from "./slice/BookSlice";

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

  const store = configureStore({
    reducer: {
      books: BookReducer,
    },
  });

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = orgConsoleError;
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

    const bookGrid = screen.queryByTestId("book-grid");
    expect(bookGrid).not.toBeNull();
    expect(bookGrid.children.length).toBe(3);
    expect(screen.queryAllByText("GRE Prep Plus 2021").length).toBe(2);
    expect(screen.queryAllByText(/Kaplan Test Prep/).length).toBe(2);
    expect(screen.queryAllByText("LoremIpsum").length).toBe(1);
  });
});
