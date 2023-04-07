import Books from "../data/books.json";

export default function getBooks() {
  return new Promise((resolve) => {
    if (!Books) {
      resolve([]);
    } else {
      const response = {
        total: Books.totalItems || 0,
        results: Books.items?.map((book) => ({
          id: book.id,
          title: book.volumeInfo?.title,
          authors: book.volumeInfo?.authors.join(","),
          publisher: book.volumeInfo?.publisher,
          publishedDate: book.volumeInfo?.publishedDate,
        })),
      };
      setTimeout(resolve, 2000, response);
    }
  });
}
