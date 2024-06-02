import { IBook, IBooksInfo, IBooksResponse, ISelectedBook, ICart, IFavorites } from "../../types";
import { 
    SET_BOOKS, 
    LOAD_BOOKS, 
    LOAD_SELECTED_BOOK, 
    SET_SELECTED_BOOK, 
    SET_BOOKS_LIMIT, 
    SET_CURRENT_PAGE, 
    SET_CURRENT_BOOK, 
    SET_TOTAL, 
    ADD_TO_CART, 
    INCREASE_QUANTITY, 
    DECREASE_QUANTITY, 
    REMOVE_FROM_CART, 
    ADD_TO_FAVORITES, 
    REMOVE_FROM_FAVORITES,
    CLEAR_CART 
    } from '../actionTypes';
import { takeEvery, put } from 'redux-saga/effects'


// Загрузка всех книг
const loadBooks = (booksInfo: IBooksInfo) => ({
    type: LOAD_BOOKS,
    booksInfo
})

const setBooks = (books: IBook[]) => ({
    type: SET_BOOKS,
    books
})

// Количество постов, которое рендерится на странице (10, 15, 20)
const setBookLimit = (limit: number) => ({
    type: SET_BOOKS_LIMIT,
    limit
})

// Кликая по книге, открывается полная информация по книге
const loadSelectedBook = (isbn13: string) => ({
    type: LOAD_SELECTED_BOOK,
    isbn13
})

// Обновление стейта
const setSelectedBook = (selectedBook: ISelectedBook) => ({
    type: SET_SELECTED_BOOK,
    selectedBook
})

const setTotal = (total: number) => ({
    type: SET_TOTAL,
    total
})

// Пагинация
const setCurrentPage = (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

const setCurrentBook = (currentBook: number) => ({
   type: SET_CURRENT_BOOK,
   currentBook
})

// Добавление в корзину
const addToCart = (cart: ICart) => ({
    type: ADD_TO_CART,
    cart
});

const increaseQuantity = (isbn13: number) => ({
    type: INCREASE_QUANTITY,
    isbn13
});

const decreaseQuantity = (isbn13: number) => ({
    type: DECREASE_QUANTITY,
    isbn13
});

// Удаление из корзины
const removeFromCart = (isbn13: number) => ({
        type: REMOVE_FROM_CART,
        isbn13
});

const addToFavorites = (favBook: IFavorites) => ({
    type: ADD_TO_FAVORITES,
    favBook
});

const removeFromFavorites = (isbn13: number) => ({
    type: REMOVE_FROM_FAVORITES,
    isbn13
});

const clearCart = () => ({
    type: CLEAR_CART
});

function* fetchLoadBooks(action: any) {
    const { limit, currentPage, search } = action.booksInfo;
    let url = `https://api.itbook.store/1.0/new?page=${currentPage}`;
    if (search) {
        url = `https://api.itbook.store/1.0/search/${search}?page=${currentPage}`;
    }
    const resp: Response = yield fetch(url);
    const data: IBooksResponse = yield resp.json();
    yield put(setBooks(data.books));
}



function* fetchSelectedBook(action: any) {
    const resp: Response = yield fetch (`https://api.itbook.store/1.0/books/${action.isbn13}`)
    const selectedBook: ISelectedBook = yield resp.json();
    yield put(setSelectedBook(selectedBook));
}

function* watcherBooks() {
    yield takeEvery(LOAD_BOOKS, fetchLoadBooks)
    yield takeEvery(LOAD_SELECTED_BOOK, fetchSelectedBook)
}

export {
    loadBooks,
    setBooks,
    watcherBooks,
    loadSelectedBook,
    setSelectedBook,
    setBookLimit,
    fetchLoadBooks,
    fetchSelectedBook,
    setCurrentPage,
    setCurrentBook,
    setTotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    addToFavorites,
    removeFromFavorites,
    clearCart
}