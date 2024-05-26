interface IButton {
    children?: string, 
    className: string,
    isActive?: boolean,
    onClick: Function,
}

export enum INPUT_TYPES {
    TEXTAREA = 'textarea',
    NUMBER = 'number',
    PASSWORD = 'password',
    TEXT = 'text'
}

interface IInput {
    className: string,
    label?: string,
    placeholder: string,
    value?: string | number,
    onChange?: Function,
    type?: INPUT_TYPES,
    disabled?: boolean,
    errorMessage?: string
}

interface IBook {
    title: string,
    subtitle: string,
    isbn13: number,
    price: number,
    image: string,
    url: string,
    backgroundColor?: string,
    onClick?: Function
}

interface ISelectedBook {
    error?: string;
    title: string;
    subtitle?: string;
    authors: string;
    publisher?: string;
    isbn10?: number;
    isbn13: number;
    pages?: number;
    year?: number;
    rating?: number;
    desc?: string;
    price: number;
    image: string;
    url?: string;
    pdf?: {
        [key: string]: string;
        };
    }
    
export interface IError {
    error: string;
}

interface IBooksResponse {
    count: number,
    books: IBook[]
}

interface IBooksState {
    books: IBook[],
    limit: number,
    selectedBook: ISelectedBook,
    total: number,
    currentPage: number,
    totalBook: number,
    currentBook: number,
    cart: ICart[]
}

interface IBooksInfo {
    limit: number;
    currentPage: number,
    search?: string | null
}

interface IStoreState {
    books: IBooksState,
    limit: number,
    user: IUserState,
    cart: ICartState
}

interface ISignUp {
    username: string,
    email: string,
    password: string,
    course_group?: number
}

interface IUser {
    username: string,
    id: number,
    email: string
}

interface IUserState {
     user: IUser
}

interface IActivationInfo {
    uid: string,
    token: string
}

interface ISignIn {
    email: string,
    password: string
}


interface ICart {
    isbn13: number;
    title: string;
    price: number;
    authors: string;
    image: string
}

interface ICartState {
    cart: ICart[];
}

export type {
    IButton,
    IInput,
    IBook,
    ISelectedBook,
    IBooksState,
    IStoreState,
    IBooksInfo,
    IBooksResponse,
    ISignUp,
    IUser,
    IUserState,
    IActivationInfo,
    ISignIn,
    ICart,
    ICartState
}