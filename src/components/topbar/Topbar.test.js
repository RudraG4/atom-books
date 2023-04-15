import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Topbar from "./Topbar";

describe("Topbar Component", () => {
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

    test("Should be rendered without error", () => {
        expect(() => renderWithRouter(<Topbar />)).not.toThrow();
        expect(screen.getByTestId("atom-icon")).toBeInTheDocument();
        expect(screen.getByText("atom")).toBeInTheDocument();
    });

    test("Should navigate to path / on atom icon click", async () => {
        const { history } = renderWithRouter(<Topbar />, ["/books"]);
        expect(history.location.pathname).toBe("/books");
        await userEvent.click(screen.getByTestId("atom-icon"));
        expect(history.location.pathname).toBe("/");
    });

    test("Should navigate to path / on atom text click", async () => {
        const { history } = renderWithRouter(<Topbar />, ["/books"]);
        expect(history.location.pathname).toBe("/books");
        await userEvent.click(screen.getByText("atom"));
        expect(history.location.pathname).toBe("/");
    });
});
