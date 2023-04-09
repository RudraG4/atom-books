import { render, fireEvent, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import BookCard from "./BookCard";

describe("BookCard component", () => {
  const renderWithRouter = (component, history) => {
    return render(
      <Router location={history.location} navigator={history}>
        {component}
      </Router>
    );
  };
  test("Should render without error", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const book = {
      id: "qwtcuu",
      title: "GRE PLUS 2021",
      authors: "Kaplan Authors",
      publisher: "Kaplan Publishers",
      publishedDate: "2020-06-02",
    };
    renderWithRouter(<BookCard book={book} />, history);

    expect(screen.getByTestId("title")).toHaveTextContent(book.title);
    expect(screen.getByTestId("authors")).toHaveTextContent(book.authors);
    expect(screen.getByTestId("publisher")).toHaveTextContent(book.publisher);
    expect(screen.getByTestId("publisheddate")).toHaveTextContent(
      book.publishedDate
    );
  });
});
