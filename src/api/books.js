import axios from "axios";

const BASE_BOOK_URL = "https://www.googleapis.com/books/v1/volumes";

const BooksAPI = {};

BooksAPI.fetchBooks = async () => {
    const response = { total: 0, results: [] };
    const bookResponse = await axios.get(`${BASE_BOOK_URL}?q=kaplan%20test%20prep`);
    if (bookResponse?.data?.items?.length) {
        response.total = bookResponse.data.totalItems || 0;
        response.results = bookResponse.data.items?.map((book) => {
            const volumeInfo = book.volumeInfo || {};
            const isbns =
                volumeInfo.industryIdentifiers
                    ?.filter((ident) => ident.type.includes("ISBN"))
                    .map((_iden) => _iden.identifier)
                    .join(", ") || "";
            const { medium, thumbnail } = volumeInfo.imageLinks || {};
            const bookCover = medium || thumbnail;
            return {
                id: book.id,
                title: volumeInfo.title,
                subtitle: volumeInfo.subtitle,
                authors: volumeInfo.authors.join(","),
                publisher: volumeInfo.publisher,
                publishedDate: volumeInfo.publishedDate,
                isbns,
                pageCount: volumeInfo.pageCount,
                images: {
                    bookCover,
                    thumbnail
                },
                description: volumeInfo.description,
            };
        });
    }
    return response;
};

BooksAPI.fetchBookById = async (bookId) => {
    const response = await axios.get(`${BASE_BOOK_URL}/${bookId}`);
    if (response?.data) {
        const book = response?.data;
        const volumeInfo = book.volumeInfo || {};
        const isbns =
            volumeInfo.industryIdentifiers
                ?.filter((ident) => ident.type.includes("ISBN"))
                .map((_iden) => _iden.identifier)
                .join(", ") || "";
        const { medium, thumbnail } = volumeInfo.imageLinks || {};
        const bookCover = medium || thumbnail;
        return {
            id: book.id,
            title: volumeInfo.title,
            subtitle: volumeInfo.subtitle,
            authors: volumeInfo.authors?.join(",") || "",
            publisher: volumeInfo.publisher,
            publishedDate: volumeInfo.publishedDate,
            isbns,
            pageCount: volumeInfo.pageCount,
            images: {
                bookCover,
                thumbnail
            },
            description: volumeInfo.description,
        };
    }
    return null;
};

export default BooksAPI;
