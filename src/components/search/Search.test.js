import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

describe("Search Component", () => {
  const original = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = original;
  });

  test("Should render without error", () => {
    render(<Search />);
    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(screen.getByTestId("search-adornment")).toBeInTheDocument();
  });

  test("Should throw error if onSearch is not a function", () => {
    expect(() => render(<Search onSearch="" />)).toThrow(
      "onSearch is not a function"
    );
  });

  /** Testing component having debounce hook */
  test("Should invoke onSearch on input", async () => {
    const onSearch = jest.fn();
    render(<Search onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("Search");
    userEvent.type(input, "GRE");
    expect(onSearch).not.toHaveBeenCalledWith("GRE");
    await waitFor(() => expect(onSearch).toHaveBeenCalledWith("GRE"));
  });
});
