import { IBooksState, IBook, ISelectedBook, ICart } from '../../types';
import { ADD_TO_CART, SET_BOOKS, SET_BOOKS_LIMIT, SET_CURRENT_BOOK, SET_CURRENT_PAGE, SET_SELECTED_BOOK, SET_TOTAL } from '../actionTypes';

const initialState: IBooksState = {
    books: [] as IBook[],
    limit: 6,
    selectedBook: {} as ISelectedBook,
    currentPage: 1,
    total: 0,
    currentBook: 1,
    totalBook: 0,
    cart: [] as ICart[],
};

const booksReducer = (state: IBooksState = initialState, action: any) => {
    switch (action.type) {
        case SET_BOOKS: {
            return {
                ...state,
                books: action.books,
            };
        }
        case SET_BOOKS_LIMIT: {
            return {
                ...state,
                limit: action.limit,
            };
        }
        case SET_SELECTED_BOOK: {
            return {
                ...state,
                selectedBook: action.selectedBook,
            };
        }
        case SET_TOTAL: {
            return {
                ...state,
                total: action.total,
            };
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage,
            };
        }
        case SET_CURRENT_BOOK: {
            return {
                ...state,
                currentBook: action.currentBook,
            };
        }
        case ADD_TO_CART: {
            return {
                ...state,
                cart: [...state.cart, action.cart],
            };
        }
        default: {
            return state;
        }
    }
};

export { booksReducer };
