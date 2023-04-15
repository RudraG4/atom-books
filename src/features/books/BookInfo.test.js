import { render, waitFor, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { ErrorBoundary } from "react-error-boundary";
import axios from "axios";
import ErrorHandler from "components/errorhandler/ErrorHandler";
import BookReducer from "./slice/BookSlice";
import BookInfo from "./BookInfo";

const mockBookData = {
    data: {
        id: "Wl-2DwAAQBAJ",
        volumeInfo: {
            title: "GMAT Prep Plus 2021",
            subtitle: "6 Practice Tests + Proven Strategies + Online + Mobile",
            authors: ["Kaplan Test Prep"],
            publisher: "Simon and Schuster",
            publishedDate: "2020-06-02",
            description: "Always study with the most up-to-date prep! Look for \u003ci\u003e GMAT Prep Plus 2022–2023\u003c/i\u003e, ISBN 9781506277233, on sale December 14, 2021.\u2028\u003cbr\u003e\u003cbr\u003e\u003cb\u003ePublisher's Note: \u003c/b\u003eProducts purchased from third-party sellers are not guaranteed by the publisher for quality, authenticity, or access to any online entitles included with the product.",
            industryIdentifiers: [
                { type: "ISBN_10", identifier: "1506262384" },
                { type: "ISBN_13", identifier: "9781506262383" }
            ],
            pageCount: 1176,
            imageLinks: {
                medium: "http://books.google.com/books/publisher/content?id=Wl-2DwAAQBAJ&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE71UcDXClPA1ogYWwaX18WEHYd0WUXgp3emngo5y2sRj-dXuxh5HuIvnSlDNn4_8HCHbIeXVbcZZZSbFjLG6Zo5DC-vpitfmVUvxmLkRyHqibwlHREx3LSd0uvq1NM3Yx67_eqy5&source=gbs_api",
            }
        },
    }
};

jest.mock("axios");

describe("BookInfo component", () => {
    let store;

    beforeEach(() => {
        store = configureStore({ reducer: { books: BookReducer, } });
    });

    afterEach(() => {
        cleanup();
    });

    const renderWithContext = (component, initialEntries = ["/"]) => {
        const history = createMemoryHistory({ initialEntries });
        return {
            history,
            ...render(
                <Router location={history.location} navigator={history}>
                    <Provider store={store}>
                        <ErrorBoundary fallbackRender={ErrorHandler}>
                            {component}
                        </ErrorBoundary>
                    </Provider>
                </Router>
            ),
        };
    };

    test("Should render without error", async () => {
        const { volumeInfo } = mockBookData.data;
        axios.get.mockResolvedValueOnce(mockBookData);
        const { getByText } = renderWithContext(<BookInfo />, ["/book/Wl-2DwAAQBAJ"]);
        expect(getByText("Loading...")).toBeInTheDocument();
        await waitFor(() => { expect(getByText(mockBookData.data.id)).toBeInTheDocument(); });
        expect(getByText(volumeInfo.title)).toBeInTheDocument();
        expect(getByText(volumeInfo.subtitle)).toBeInTheDocument();
        expect(getByText(volumeInfo.authors.join(", "))).toBeInTheDocument();
        expect(getByText(volumeInfo.publisher)).toBeInTheDocument();
        expect(getByText(volumeInfo.publishedDate)).toBeInTheDocument();
        const ISBNs = volumeInfo.industryIdentifiers.filter((ident) => ident.type.includes("ISBN"))
            .map((_iden) => _iden.identifier)
            .join(", ");
        expect(getByText(ISBNs)).toBeInTheDocument();
        expect(getByText(volumeInfo.pageCount)).toBeInTheDocument();
        expect(getByText(/Always study with the most up-to-date prep! Look for/)).toBeInTheDocument();
    });
});
