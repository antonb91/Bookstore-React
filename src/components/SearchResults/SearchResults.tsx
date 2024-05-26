import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IStoreState } from "../../types";
import { loadBooks } from "../../redux/actionCreators";
import './SearchResults.css'
import { Book } from "../Books";
import { IBook } from "../../types";
// import { Pagination } from "../../Pagination";

const SearchResults = () => {
    const books = useSelector((state: IStoreState) => state.books.books);
    const limit = useSelector((state: IStoreState) => state.books.limit);
    const currentPage = useSelector((state: IStoreState) => state.books.currentPage);
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        dispatch(loadBooks({ limit, currentPage, search: params.get('search') }));
    }, [limit, currentPage, dispatch]);

    return (
        <div className='search__result-wrapper'>
            <div className='search'>
                {books.map((book: IBook) => (
                    <Book key={book.isbn13} {...book} />
                ))}
                {/* <Pagination /> */}
            </div>
        </div>
    );
}

export { SearchResults };
