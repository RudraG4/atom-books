import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

describe("Search Component", () => {
    test("Should render without error", () => {
        render(<Search placeholder="Search title" />);
        expect(screen.getByTestId("search")).toBeInTheDocument();
        expect(screen.getByTestId("search-adornment")).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Search title/i)).toBeInTheDocument();
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
        const input = screen.getByPlaceholderText(/Search/i);
        await userEvent.type(input, "GRE");
        expect(onSearch).not.toHaveBeenCalledWith("GRE");
        await waitFor(() => expect(onSearch).toHaveBeenCalledWith("GRE"));
    });
});
