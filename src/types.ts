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
    label: string,
    placeholder: string,
    value?: string | number,
    onChange?: Function,
    type?: INPUT_TYPES,
    disabled?: boolean,
    errorMessage?: string
}

// interface IStoreState {
//     posts: IPostsState,
//     ui: IUIState,
//     limit: number,
//     user: IUserState
// }

export type {
    IButton,
    IInput,
    // IStoreState
}