import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();

    const ings = useSelector( state => state.burgerBuilder.ingredients);
    const price = useSelector( state => state.burgerBuilder.totalPrice);
    const error = useSelector( state => state.burgerBuilder.error);
    const isAuthenticated = useSelector( state => state.auth.token !== null);

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchasableState = () => {
        let ingredientCount = Object.keys(ings)
                    .map( igKey => ings[igKey])
                    .reduce( (sum, el) => sum + el , 0);
        return ingredientCount > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/login');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    let orderSummary = null;

    let burger = error ? <p>Cannot load ingredients</p> : <Spinner />;

    if (ings) {
        burger = (<Aux>
                    <Burger ingredients={ings} />
                    <BuildControls
                        isAuth={isAuthenticated}
                        ingredients={ings}
                        price={price}
                        purchasable={updatePurchasableState()}
                        ingredientAdded={onIngredientAdded}
                        order={purchaseHandler}
                        ingredientRemove={onIngredientRemoved} />
                </Aux>);

        orderSummary = <OrderSummary
                            ingredients={ings}
                            purchaseCancelled={purchaseCancelHandler}
                            purchaseContinued={purchaseContinueHandler}
                            price={price} />;
    }

    /* if (this.state.loading) {
        orderSummary = <Spinner />;
    } */        

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

export default withErrorHandler(BurgerBuilder, axios);