import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                <input className={classes.Input}  type='text' name='name' placeholder='Enter your name' />
                <input className={classes.Input} type='text' name='email' placeholder='Enter your email' />
                <input className={classes.Input} type='text' name='street' placeholder='Enter street name' />
                <input className={classes.Input} type='text' name='postalCode' placeholder='Enter postal code' />
                <Button btnType='Success'>ORDER</Button>
            </div>
        );
    }
}

export default ContactData;