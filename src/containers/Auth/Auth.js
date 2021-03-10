import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

import classes from './Auth.module.css';

class Auth extends Component {

    state = {
        controls: {
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
        },
        isFormValid: false,
        isSignup: true
    }

    validateInput = (value, rules) => {
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

    inputChangedHandler = (event, inputIdentifier) => {
        const currForm = {
            ...this.state.controls
        }

        const currInputElement = {
            ...currForm[inputIdentifier]
        }

        currInputElement.value = event.target.value;
        currInputElement.valid = this.validateInput(currInputElement.value, currInputElement.validation);
        currInputElement.touched = true;
        currForm[inputIdentifier] = currInputElement;

        let isFormValid = true;

        for (let formElement in currForm) {
            if (!currForm[formElement].valid) {
                isFormValid = false;
                break;
            }
        }

        this.setState({controls: currForm, isFormValid: isFormValid});
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchSignInMode = () => {
        this.setState((prevState) => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render() {
        let formElements = [];

        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElements.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        value={formElement.config.value}
                        changed={ (event) => this.inputChangedHandler(event, formElement.id) } />
                ))}
                <Button disabled={!this.state.isFormValid} btnType='Success'>SUBMIT</Button>
            </form>
        );

        return(
            <div className={classes.Auth}>
                {form}
                <Button clicked={this.switchSignInMode} btnType='Danger'>SWITCH TO {this.state.isSignup ? 'SIGN IN': 'SIGN UP'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(null, mapDispatchToProps)(Auth);