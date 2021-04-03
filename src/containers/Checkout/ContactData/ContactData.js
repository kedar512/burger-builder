import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

import classes from './ContactData.module.css';

const ContactData = props => {

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter your name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter your email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{
                    value: 'fastest', displayValue: 'Fastest'    
                },
                {
                    value: 'cheapest', displayValue: 'Cheapest'
                }]
            },
            value: 'fastest',
            valid: true
        }
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }

        props.onPurchaseBurger(order, props.token);
    }

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
        }

        return isValid;
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const currForm = {
            ...orderForm
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

        setOrderForm(currForm);
        setIsFormValid(isFormValid);
    }

    let formElements = [];

    for (let key in orderForm) {
        formElements.push({
            id: key,
            config: orderForm[key]
        });
    }

    let form = (
        <form onSubmit={orderHandler} >
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
            <Button disabled={!isFormValid} btnType='Success'>ORDER</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />
    }
    return(
        <div className={classes.ContactData}>
            <h4>Enter your contact details</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));