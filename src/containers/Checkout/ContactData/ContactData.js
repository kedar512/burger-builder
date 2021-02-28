import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Kedar',
                address: {
                    street: 'test Road',
                    zipCode: '444444',
                    country: 'India'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'Quick Delivery'
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false});
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input}  type='text' name='name' placeholder='Enter your name' />
                <input className={classes.Input} type='text' name='email' placeholder='Enter your email' />
                <input className={classes.Input} type='text' name='street' placeholder='Enter street name' />
                <input className={classes.Input} type='text' name='postalCode' placeholder='Enter postal code' />
                <Button clicked={this.orderHandler} btnType='Success'>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;