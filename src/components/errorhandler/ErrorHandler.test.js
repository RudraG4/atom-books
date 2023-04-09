import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "./ErrorHandler";

describe("ErrorHandler component", () => {
  const original = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = original;
  });

  test("Render ErrorHandler on error", async () => {
    const onReset = jest.fn();
    const CompWithError = () => {
      throw new Error("Error happened");
    };
    const WithErrorBoundary = () => {
      return (
        <ErrorBoundary fallbackRender={ErrorHandler} onReset={onReset}>
          <CompWithError />
        </ErrorBoundary>
      );
    };
    render(<WithErrorBoundary />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    const tryAgainButton = screen.getByText(/Try Again/i);
    expect(tryAgainButton).toBeInTheDocument();
    await userEvent.click(tryAgainButton);
    expect(onReset).toHaveBeenCalled();
  });
});
