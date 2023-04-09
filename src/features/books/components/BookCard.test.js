import { render, fireEvent, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import BookCard from "./BookCard";

describe("BookCard component", () => {
  const orgConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = orgConsoleError;
  });

  const renderWithRouter = (component, initialEntries = ["/"]) => {
    const history = createMemoryHistory({ initialEntries });
    return {
      history,
      ...render(
        <Router location={history.location} navigator={history}>
          {component}
        </Router>
      ),
    };
  };

  test("Should render without error", () => {
    const book = {
      id: "qwtcuu",
      title: "GRE PLUS 2021",
      authors: "Kaplan Authors",
      publisher: "Kaplan Publishers",
      publishedDate: "2020-06-02",
    };
    expect(() => renderWithRouter(<BookCard book={book} />)).not.toThrow();
    expect(screen.getByTestId("title")).toHaveTextContent(book.title);
    expect(screen.getByTestId("authors")).toHaveTextContent(book.authors);
    expect(screen.getByTestId("publisher")).toHaveTextContent(book.publisher);
    expect(screen.getByTestId("publisheddate")).toHaveTextContent(
      book.publishedDate
    );
  });

  test("Should throw error if book is not passed", () => {
    expect(() => renderWithRouter(<BookCard />)).toThrow(
      "BookCard is requires 'book' prop"
    );
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][2]).toMatch(
      /`book` is marked as required/
    );
  });

  test("Should throw error if required props is not passed", () => {
    const book = { id: "qwtcuu", authors: "Kaplan Authors" };
    expect(() => renderWithRouter(<BookCard book={book} />)).toThrow(
      "BookCard's book prop is missing mandatory fields"
    );
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][2]).toMatch(
      /`book.title` is marked as required/
    );
  });
});
