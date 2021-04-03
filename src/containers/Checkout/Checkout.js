import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout  = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to='/' />;
    const purchased = props.purchased ? <Redirect to='/' /> : null;
    if (props.ings) {
        summary = (
            <div>
                {purchased}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
                <Route path={`${props.match.url}/contact-data`}
                        component={ContactData} />
            </div>
        );
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default withRouter(connect(mapStateToProps)(Checkout));