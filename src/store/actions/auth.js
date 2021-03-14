import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkLogout = expirationTime => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1JQ-ffAjpDVgP4dK6IvXTc8IrODcOZmQ';

        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1JQ-ffAjpDVgP4dK6IvXTc8IrODcOZmQ';
        }
       axios.post(url, authData)
            .then( response => {
                console.log(response);
                const userId = response.data.localId;
                const expiresIn = response.data.expiresIn;
                //const expiresIn = 60;
                const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', userId);

                dispatch(authSuccess(response.data));
                dispatch(checkLogout(expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthStatus = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const expiresIn = calculateExpiresIn(expirationDate);
                console.log('Expires in', expiresIn);
                const authData = {
                    idToken: localStorage.getItem('token'),
                    localId: localStorage.getItem('userId')
                }
                dispatch(authSuccess(authData));
                dispatch(checkLogout(expiresIn));
            } else {
                dispatch(logout());
            }
        }
    }
}

const calculateExpiresIn = (expirationDate) => {
    const expiredIn = ( ( expirationDate.getHours() - new Date().getHours() ) * 3600 )
    + ( ( expirationDate.getMinutes() - new Date().getMinutes() ) * 60 )
    + ( expirationDate.getSeconds() - new Date().getSeconds() )
    return expiredIn;
}