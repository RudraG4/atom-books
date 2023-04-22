import { useSelector } from "react-redux";
import { getFilteredBooks, getStatus, getError } from "../slice/BookSlice";

export default function useBooks(searchTerm) {
    const books = useSelector((state) => getFilteredBooks(state, searchTerm));
    const status = useSelector(getStatus);
    const error = useSelector(getError);

    return { books, status, error };
}
