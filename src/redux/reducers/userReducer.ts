import { ISignUp, IUser, IUserState } from "../../types";
import { SET_USER } from "../actionTypes/userActionTypes";

const initialStoreState = {
    user: {} as IUser
}

const userReducer = (state: IUserState = initialStoreState, action: any) => {
    switch (action.type) {
        case SET_USER: {
            console.log(action)
            return ({
                ...state,
                user: action.user
            })
        }
        default: {
            return state
        }
    }
}

export { userReducer }