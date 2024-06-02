import { IBooksState, IBook, ISelectedBook, ICart, IFavorites } from '../../types';
import { 
        ADD_TO_CART, 
        INCREASE_QUANTITY, 
        DECREASE_QUANTITY, 
        REMOVE_FROM_FAVORITES, 
        ADD_TO_FAVORITES, 
        SET_BOOKS, 
        SET_BOOKS_LIMIT, 
        SET_CURRENT_BOOK, 
        SET_CURRENT_PAGE, 
        SET_SELECTED_BOOK, 
        SET_TOTAL, 
        REMOVE_FROM_CART,
        CLEAR_CART } from '../actionTypes';

const loadCartFromLocalStorage = (): ICart[] => {
    try {
        const serializedCart = localStorage.getItem('cart');
        return serializedCart ? JSON.parse(serializedCart) : [];
    } catch (e) {
        console.warn("Could not load cart from localStorage", e);
        return [];
    }
}

const saveCartToLocalStorage = (cart: ICart[]) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem('cart', serializedCart);
    } catch (e) {
        console.warn("Could not save cart to localStorage", e);
    }
}

const loadFavoritesFromLocalStorage = (): IFavorites[] => {
    try {
        const serializedFavorites = localStorage.getItem('favorites');
        return serializedFavorites ? JSON.parse(serializedFavorites) : [];
    } catch (e) {
        console.warn("Could not load favorites from localStorage", e);
        return [];
    }
}

const saveFavoritesToLocalStorage = (favorites: IFavorites[]) => {
    try {
        const serializedFavorites = JSON.stringify(favorites);
        localStorage.setItem('favorites', serializedFavorites);
    } catch (e) {
        console.warn("Could not save favorites to localStorage", e);
    }
}


const initialState = {
    books: [] as IBook[],
    limit: 20,
    selectedBook: {} as ISelectedBook,
    currentPage: 1,
    total: 0,
    currentBook: 1,
    totalBook: 0,
    cart: loadCartFromLocalStorage(),
    favBook: loadFavoritesFromLocalStorage()
}

const booksReducer = (state: IBooksState = initialState, action: any) => {
    switch (action.type) {
        case SET_BOOKS: {
            return ({
                ...state,
                books: action.books
            });
        }
        case SET_BOOKS_LIMIT: {
            return ({
                ...state,
                limit: action.limit
            });
        }
        case SET_SELECTED_BOOK: {
            return ({
                ...state,
                selectedBook: action.selectedBook
            });
        }
        case SET_TOTAL: {
            return ({
                ...state,
                total: action.total
            });
        }
        case SET_CURRENT_PAGE: {
            return ({
                ...state,
                currentPage: action.currentPage
            });
        }
        case SET_CURRENT_BOOK: {
            return ({
                ...state,
                currentBook: action.currentBook
            });
        }
        case ADD_TO_CART: {
            const newCart = [...state.cart];
            const index = newCart.findIndex(item => item.isbn13 === action.cart.isbn13);

            if (index !== -1) {
                newCart[index].quantity = (newCart[index].quantity || 1) + 1;
            } else {
                newCart.push({ ...action.cart, quantity: 1 });
            }

            saveCartToLocalStorage(newCart);

            return ({
                ...state,
                cart: newCart
            });
        }
        case INCREASE_QUANTITY: {
            const newCart = [...state.cart];
            const index = newCart.findIndex(item => item.isbn13 === action.isbn13);

            if (index !== -1) {
                newCart[index].quantity += 1;
            }

            saveCartToLocalStorage(newCart);

            return ({
                ...state,
                cart: newCart
            });
        }
        case DECREASE_QUANTITY: {
            const newCart = [...state.cart];
            const index = newCart.findIndex(item => item.isbn13 === action.isbn13);

            if (index !== -1 && newCart[index].quantity > 1) {
                newCart[index].quantity -= 1;
            }

            saveCartToLocalStorage(newCart);

            return ({
                ...state,
                cart: newCart
            });
        }
        case REMOVE_FROM_CART: {
            const newCart = state.cart.filter(item => item.isbn13 !== action.isbn13);

            saveCartToLocalStorage(newCart);

            return ({
                ...state,
                cart: newCart
            });
        }
        case ADD_TO_FAVORITES: {
            const newFavBooks = [...state.favBook, action.favBook];
            saveFavoritesToLocalStorage(newFavBooks);
            return {
                ...state,
                favBook: newFavBooks
            };
        }
        case REMOVE_FROM_FAVORITES: {
            const newFavBooks = state.favBook.filter(book => book.isbn13 !== action.isbn13);
            saveFavoritesToLocalStorage(newFavBooks);
            return {
                ...state,
                favBook: newFavBooks
            };
        }
        case CLEAR_CART: {
            saveCartToLocalStorage([]);
            return {
                ...state,
                cart: []
            };
        }        
        default: {
            return state;
        }
    }
}

export { booksReducer };