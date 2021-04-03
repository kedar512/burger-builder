import {useEffect, useState } from 'react';

const useHttpErrorHandler = httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const resInterceptor = httpClient.interceptors.response.use( res => res, error => {
        setError(error);
    });

    useEffect( () => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [httpClient.interceptors.request, httpClient.interceptors.response, reqInterceptor, resInterceptor]);

    // Need to find alternative for componentWillMount
    /* componentWillMount() {
        
    } */

    const errorConfirmedHandler = () => {
        setError(null);
    }
    return [error, errorConfirmedHandler];
}

export default useHttpErrorHandler;