import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import Topbar from "./Topbar";
import Content from "components/layout/Content";
import { createMemoryHistory } from "history";

describe("Topbar Component", () => {
  const renderWithRouter = (component, history) => {
    return render(
      <Router location={history.location} navigator={history}>
        {component}
      </Router>
    );
  };

  test("Should be rendered without error", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    renderWithRouter(<Topbar />, history);
    expect(screen.getByTestId("atom-icon")).toBeInTheDocument();
    expect(screen.getByText("atom")).toBeInTheDocument();
  });

  test("Should navigate to path / on atom icon click", async () => {
    const history = createMemoryHistory({ initialEntries: ["/books"] });
    renderWithRouter(<Topbar />, history);
    expect(history.location.pathname).toBe("/books");
    await userEvent.click(screen.getByTestId("atom-icon"));
    expect(history.location.pathname).toBe("/");
  });

  test("Should navigate to path / on atom text click", async () => {
    const history = createMemoryHistory({ initialEntries: ["/books"] });
    renderWithRouter(<Topbar />, history);
    expect(history.location.pathname).toBe("/books");
    await userEvent.click(screen.getByText("atom"));
    expect(history.location.pathname).toBe("/");
  });
});
