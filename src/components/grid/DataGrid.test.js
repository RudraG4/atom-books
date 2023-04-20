import { render, screen } from "@testing-library/react";
import DataGrid from "./DataGrid";

const mockData = [
    { id: 1, title: "Official Guide to OET", },
    { id: 2, title: "GRE Prep Plus 2021", },
    { id: 3, title: "LoremIpsum", },
];

describe("DataGrid Component", () => {
    let gridProps = {};

    beforeEach(() => {
        gridProps = {
            status: "loading",
            error: "",
            results: [],
            itemRenderer: (data) => <div>{data.title}</div>
        };
    });

    test("Render the component without error and has loading screen", () => {
        render(<DataGrid {...gridProps} />);
        expect(screen.getByTestId("data-grid")).toBeInTheDocument();
        expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    test("Render the grid items", () => {
        gridProps.status = "done";
        gridProps.results = mockData;
        render(<DataGrid {...gridProps} />);
        expect(screen.getByTestId("data-grid")).toBeInTheDocument();
        mockData.forEach((data) => {
            expect(screen.getByText(data['title'])).toBeInTheDocument();
        });
    });

    test("Render error text on error", () => {
        gridProps.status = "error";
        gridProps.error = "Unknown Error";
        delete gridProps.results;
        render(<DataGrid {...gridProps} />);
        expect(screen.getByTestId("data-grid")).toBeInTheDocument();
        expect(screen.getByText(gridProps.error)).toBeInTheDocument();
    });
});