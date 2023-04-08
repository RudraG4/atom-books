import Books from "../data/books.json";

export default function getBooks() {
  const state = Math.ceil(Math.random() * 3);
  return new Promise((resolve, reject) => {
    if (!Books) {
      resolve({ total: 0, results: [] });
    } else {
      if (state === 1) {
        resolve({ total: 0, results: [] });
      }
      switch (state) {
        case 1:
          resolve({ total: 0, results: [] });
          break;
        case 2: {
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
          break;
        }
        default: {
          setTimeout(reject, 2000, "500 internal error");
        }
      }
    }
  });
}
