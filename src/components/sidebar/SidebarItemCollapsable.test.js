import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { BsWindow } from "react-icons/bs";
import SidebarItemCollapsable from "./SidebarItemCollapsable";

describe("SidebarItemCollapsable component", () => {
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
            label: "Home",
            icon: <BsWindow size={20} />,
            children: [],
        };
        expect(() =>
            renderWithRouter(<SidebarItemCollapsable item={item} />, ["/books"])
        ).not.toThrow();
        expect(screen.queryByText(item.label)).not.toBeNull();
    });

    test("Should throw error if item is not passed", () => {
        expect(() =>
            renderWithRouter(<SidebarItemCollapsable />, ["/books"])
        ).toThrow("SidebarItemCollapsable requires an 'item' prop");
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][2]).toMatch(
            /`item` is marked as required/
        );
    });

    test("Should throw error if required props is not passed", () => {
        const item = { label: "Home" };
        expect(() =>
            renderWithRouter(<SidebarItemCollapsable item={item} />)
        ).toThrow("SidebarItemCollapsable's item prop is missing mandatory fields");
        expect(console.error).toHaveBeenCalled();
        expect(console.error.mock.calls[0][2]).toMatch(
            /`item.icon` is marked as required/
        );
    });

    test("Should be closed with no submenus", () => {
        const item = {
            label: "Home",
            icon: <BsWindow size={20} />,
            children: [],
        };
        renderWithRouter(<SidebarItemCollapsable item={item} />, ["/books"]);
        expect(screen.queryByTestId("sidebar-collapse-body")).toBeNull();
    });

    test("Should be opened with submenus rendered and navigable", async () => {
        const item = {
            label: "Content Management",
            icon: <BsWindow size={20} />,
            children: [
                {
                    label: "Courses",
                    icon: <BsWindow size={20} />,
                    path: "/courses",
                },
            ],
        };
        const { history } = renderWithRouter(
            <SidebarItemCollapsable item={item} />,
            ["/"]
        );
        const collapseBtn = screen.getByTestId("sidebar-collapse-btn");
        await userEvent.click(collapseBtn);

        const collapseBody = screen.getByTestId("sidebar-collapse-body");
        expect(collapseBody).toBeInTheDocument();

        const listItems = collapseBody.querySelector("ul.MuiList-root");
        expect(listItems.children.length).toBe(item.children.length);

        expect(history.location.pathname).toBe("/");
        await userEvent.click(listItems.children[0]);
        expect(history.location.pathname).toBe("/courses");
    });
});
