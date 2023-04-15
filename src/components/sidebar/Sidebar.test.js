import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Sidebar from "./Sidebar";

describe("Sidebar component", () => {
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
        expect(() => renderWithRouter(<Sidebar />, ["/"])).not.toThrow();
        expect(screen.getByTestId("sidebar-menu")).toBeInTheDocument();
        expect(screen.getByTestId("sidebar-nav")).toBeInTheDocument();
        expect(screen.getByText("MENU")).toBeInTheDocument();
    });

    test("Should render with closed drawer", () => {
        expect(() => renderWithRouter(<Sidebar />, ["/"])).not.toThrow();
        const drawer = screen.getByTestId("sidebar-drawer");
        const renderedWidth = getComputedStyle(drawer.firstChild).width;
        expect(renderedWidth).toBe("56px");
        expect(drawer.firstChild).not.toHaveClass("is-open");
    });

    describe("Should open when clicked on menu and render nav items", () => {
        test("Should open when clicked on menu", async () => {
            expect(() => renderWithRouter(<Sidebar />, ["/"])).not.toThrow();
            const menu = screen.getByTestId("sidebar-menu");
            const drawer = screen.getByTestId("sidebar-drawer");
            await userEvent.click(menu);

            expect(drawer).toHaveClass("is-open");
            const renderedWidth = getComputedStyle(drawer.firstChild).width;
            expect(renderedWidth).toBe("300px");
        });

        test("Should have nav items rendered", async () => {
            expect(() => renderWithRouter(<Sidebar />, ["/"])).not.toThrow();
            const sidebarNav = screen.getByTestId("sidebar-nav");
            expect(sidebarNav.children.length).toBe(2);
        });
    });
});
