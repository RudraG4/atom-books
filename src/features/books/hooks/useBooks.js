import { useSelector, useDispatch } from "react-redux";
import { getFilteredBooks, getStatus, getError } from "../slice/BookSlice";

export default function useBooks() {
    const dispatch = useDispatch();
    const books = useSelector(getFilteredBooks);
    const status = useSelector(getStatus);
    const error = useSelector(getError);

    return { dispatch, books, status, error };
}
