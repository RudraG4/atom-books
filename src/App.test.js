import { render, cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "nanoid";
import BookReducer, { fetchBooks } from "features/books/slice/BookSlice";
import App from "./App";

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

describe("Application Test", () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { books: BookReducer } });
  });

  afterEach(cleanup);

  const renderWithContext = (component) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

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

  test("Show 404 not found on clicking book card", async () => {
    axios.get.mockResolvedValueOnce(mockBookData);
    await store.dispatch(fetchBooks());
    const { queryByTestId, queryByText, unmount } = renderWithContext(<App />);

    let bookGrid = screen.queryByTestId("book-grid");
    expect(bookGrid).not.toBeNull();
    expect(bookGrid.children.length).toBe(3);
    const actionArea = bookGrid.children[0].querySelector(
      "a.MuiCardActionArea-root"
    );
    await userEvent.click(actionArea);
    await waitFor(
      () => {
        expect(
          queryByText(/The page you are looking for is not found/)
        ).toBeInTheDocument();
        expect(queryByText("404")).toBeInTheDocument();
      },
      { interval: 1000, timeout: 5001 }
    );
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
      () => {
        expect(queryByText(/Coming Soon/)).toBeInTheDocument();
      },
      { interval: 1000, timeout: 5001 }
    );
    await unmount();
  });
});