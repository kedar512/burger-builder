import React from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

    let ingredientSummary = Object.keys(props.ingredients)
                .map(igKey => {
                    return (
                        <li key={igKey}>
                            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                        </li>
                    );
                });
    return (
        <Aux>
            <h3>Order Summary</h3>
            <p>Following are the delicious items added in your order</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued} >CONTINUE</Button>
        </Aux>
    );
}

export default OrderSummary;