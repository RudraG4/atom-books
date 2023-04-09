import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Topbar from "./Topbar";

describe("Topbar Component", () => {
  test("Should be rendered without error", () => {
    render(<Topbar />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("atom-icon")).toBeInTheDocument();
    expect(screen.getByText("atom")).toBeInTheDocument();
  });
  
  
});
