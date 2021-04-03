import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

const Auth = props => {

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter your email'
            },
            value: '',
            validation: {
                required: true,
                pattern: /^[a-z|1-9|\\.]+(.+?)(@{1})(.+?)(\.)(.+?)$/
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Enter password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const { building, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if (!building && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    });

    const validateInput = (value, rules) => {
        let isValid = true;

        for (let rule in rules) {
            if ('required' === rule && '' === value.trim()) {
                isValid = false;
                break;
            }

            if ('minLength' === rule && value.trim().length < rules['minLength']) {
                isValid = false;
                break;
            }

            if ('maxLength' === rule && value.trim().length > rules['maxLength']) {
                isValid = false;
                break;
            }

            if ('pattern' === rule && !rules['pattern'].test(value.trim())) {
                isValid = false;
                break;
            }
        }

        return isValid;
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const currForm = {
            ...controls
        }

        const currInputElement = {
            ...currForm[inputIdentifier]
        }

        currInputElement.value = event.target.value;
        currInputElement.valid = validateInput(currInputElement.value, currInputElement.validation);
        currInputElement.touched = true;
        currForm[inputIdentifier] = currInputElement;

        let isFormValid = true;

        for (let formElement in currForm) {
            if (!currForm[formElement].valid) {
                isFormValid = false;
                break;
            }
        }

        setControls(currForm);
        setIsFormValid(isFormValid);
    }

    const submitHandler = event => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup);
    }

    const switchSignInMode = () => {
        setIsSignup((prevState) => !prevState);
    }

    let formElements = [];
    let errorMessage = null;
    let authRedirect = null;

    for (let key in controls) {
        formElements.push({
            id: key,
            config: controls[key]
        });
    }

    let form = (
        <form onSubmit={submitHandler}>
            {formElements.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    value={formElement.config.value}
                    changed={ (event) => inputChangedHandler(event, formElement.id) } />
            ))}
            <Button disabled={!isFormValid} btnType='Success'>SUBMIT</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    if (props.error) {
        errorMessage =(
            <p>{props.error.message}</p>
        );
    }

    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return(
        <div className={classes.Auth}>
            {authRedirect}
            {form}
            <Button clicked={switchSignInMode} btnType='Danger'>SWITCH TO {isSignup ? 'SIGN IN': 'SIGN UP'}</Button>
            {errorMessage}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);