import { ISignUp, ISignIn, IUser } from "../../types";
import { ACTIVATE_SIGN_UP, SIGN_UP_USER, SIGN_IN_USER, GET_USER_INFO, SET_USER } from "../actionTypes/userActionTypes";
import { IActivationInfo } from "../../types";
import { put, takeEvery } from "redux-saga/effects";
import { CLIENT_RENEG_LIMIT } from "tls";


const signUpUser = (signUpData: ISignUp) => ({
    type: SIGN_UP_USER,
    signUpData
})

const activationSignUp = (activateInfo: IActivationInfo) => ({
    type: ACTIVATE_SIGN_UP,
    activateInfo
})

const signInUser = (signInData: ISignIn) => ({
    type: SIGN_IN_USER,
    signInData
})

const getUserInfo = () => ({
    type: GET_USER_INFO,
})

const setUser = (user: IUser) => ({
    type: SET_USER,
    user
})

function* signUp(action: any) {
    const resp: Response = yield fetch('https://studapi.teachmeskills.by/auth/users/', {
        method: 'POST',
        body: JSON.stringify(action.signUpData),
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

function* activationUser(action: any) {
    const resp: Response = yield fetch('https://studapi.teachmeskills.by/auth/users/activation/', {
        method: 'POST',
        body: JSON.stringify(action.activateInfo),
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

function* signIn(action: any) {
    const resp: Response = yield fetch('https://studapi.teachmeskills.by/auth/jwt/create/', {
        method: 'POST',
        body: JSON.stringify(action.signInData),
        headers: {
        'Content-Type': 'application/json'
        }
    })
    if (resp.status === 200) {
        const tokens: { access: string, refresh: string } = yield resp.json();
        localStorage.setItem('access', tokens.access)
        localStorage.setItem('refresh', tokens.refresh)
        window.location.pathname = '/posts'
    }
}

function* fetchUserInfo(action: any) {
    const token: string = yield getToken();
    const resp: Response = yield fetch (`https://studapi.teachmeskills.by/auth/users/me/`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
    }
})
    if (resp.status === 200) {
        const user: IUser = yield resp.json();
        yield put(setUser(user))
    }
}

function* getToken() {
    const resp: Response = yield fetch (`https://studapi.teachmeskills.by/auth/jwt/verify/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({token: localStorage.getItem('access')}),
})
    if (resp.status === 200) {
        return localStorage.getItem('access')
    } else {
        const resp: Response = yield fetch (`https://studapi.teachmeskills.by/auth/jwt/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({refresh: localStorage.getItem('refresh')}),
    })
    if (resp.status === 200) {
        const token: {access: string} = yield resp.json();
        localStorage.setItem('access', token.access)
        return token.access
    }

    }
}

function* watcherUser() {
    yield takeEvery(SIGN_UP_USER, signUp)
    yield takeEvery(ACTIVATE_SIGN_UP, activationUser)
    yield takeEvery(SIGN_IN_USER, signIn)
    yield takeEvery(GET_USER_INFO, fetchUserInfo)
}

export { 
    signUpUser, 
    watcherUser, 
    activationSignUp,
    activationUser,
    signInUser,
    getUserInfo,
    setUser,
    getToken
}
