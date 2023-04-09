import { render, fireEvent, screen } from "@testing-library/react"; // Provides helper methods to access React VDom and Test it
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

  test("Should invoke onSearch on input", () => {
    const onSearch = jest.fn();
    render(<Search onSearch={onSearch} />);
    const input = screen.getByTestId("search").querySelector("input");
    fireEvent.change(input, { target: { value: "GRE" } });
    expect(onSearch).toHaveBeenCalled();
    expect(input.value).toBe("GRE");
  });
});
