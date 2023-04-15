import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { BsWindow } from "react-icons/bs";
import SidebarItem from "./SidebarItem";

describe("SidebarItem component", () => {
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
        const item = {
            path: "/",
            label: "Home",
            icon: <BsWindow size={20} />,
        };
        expect(() =>
            renderWithRouter(<SidebarItem item={item} />, ["/books"])
        ).not.toThrow();
        expect(screen.getByTestId("sidebar-item")).toHaveAttribute("href", "/");
        expect(screen.getByTestId("sidebar-item-icon")).toBeInTheDocument();
        expect(screen.getByTestId("sidebar-item-label")).toHaveTextContent(
            item.label
        );
    });

    test("Should throw error if item is not passed", () => {
        expect(() => renderWithRouter(<SidebarItem />, ["/books"])).toThrow(
            "SidebarItem requires an 'item' prop"
        );
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][2]).toMatch(
            /`item` is marked as required/
        );
    });

    test("Should throw error if required props is not passed", () => {
        const item = { path: "/", label: "Home" };
        expect(() => renderWithRouter(<SidebarItem item={item} />)).toThrow(
            "SidebarItem's item prop is missing mandatory fields"
        );
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][2]).toMatch(
            /`item.icon` is marked as required/
        );
    });

    test("Should be able to navigate to Home", async () => {
        const item = {
            path: "/",
            label: "Home",
            icon: <BsWindow size={20} />,
        };
        const { history } = renderWithRouter(<SidebarItem item={item} />, [
            "/books",
        ]);
        expect(history.location.pathname).toBe("/books");
        await userEvent.click(screen.getByText("Home"));
        expect(history.location.pathname).toBe("/");
    });
});
