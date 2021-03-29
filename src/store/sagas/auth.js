import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
    // Using call here to be able to mock
    // it for unit testing
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1JQ-ffAjpDVgP4dK6IvXTc8IrODcOZmQ';

    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1JQ-ffAjpDVgP4dK6IvXTc8IrODcOZmQ';
    }
    try {
        const response = yield axios.post(url, authData);
    
        console.log(response);
        const userId = response.data.localId;
        const expiresIn = response.data.expiresIn;
        //const expiresIn = 60;
        const expirationDate = yield new Date(new Date().getTime() + (expiresIn * 1000));

        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', userId);

        yield put(actions.authSuccess(response.data));
        yield put(actions.checkLogout(expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* checkAuthStatusSaga(action) {
    const token = yield localStorage.getItem('token');

    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate > new Date()) {
            const expiresIn = yield calculateExpiresIn(expirationDate);
            console.log('Expires in', expiresIn);
            const authData = {
                idToken: localStorage.getItem('token'),
                localId: localStorage.getItem('userId')
            }
            yield put(actions.authSuccess(authData));
            yield put(actions.checkLogout(expiresIn));
        } else {
            yield put(actions.logout());
        }
    }
}

const calculateExpiresIn = (expirationDate) => {
    const expiredIn = ( ( expirationDate.getHours() - new Date().getHours() ) * 3600 )
    + ( ( expirationDate.getMinutes() - new Date().getMinutes() ) * 60 )
    + ( expirationDate.getSeconds() - new Date().getSeconds() )
    return expiredIn;
}