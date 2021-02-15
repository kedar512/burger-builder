import { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.5,
    cheese: 1.0,
    meat: 1.0
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchasableState = () => {
        let currIngredients = {
            ...this.state.ingredients
        }
        let ingredientCount = Object.keys(currIngredients)
                    .map( igKey => currIngredients[igKey])
                    .reduce( (sum, el) => sum + el , 0);
        this.setState({ purchasable: ingredientCount > 0});
    }

    addIngredientHandler = type => {
        this.setState(( prevState, props) => {
            let currIngredients = {
                ...prevState.ingredients
            }
            
            currIngredients[type] = currIngredients[type] + 1;

            return {
                ingredients: currIngredients,
                totalPrice: prevState.totalPrice + INGREDIENT_PRICE[type]
            }
        }, () => this.updatePurchasableState());
    }

    removeIngredientHandler = type => {
        this.setState(( prevState, props) => {
            let currIngredients = {
                ...prevState.ingredients
            }
            
            currIngredients[type] = currIngredients[type] - 1;
            let totalPrice = prevState.totalPrice - INGREDIENT_PRICE[type];

            return {
                ingredients: currIngredients,
                totalPrice: totalPrice
            }
        }, () => this.updatePurchasableState());
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    render() {
        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ingredientAdded={this.addIngredientHandler}
                    order={this.purchaseHandler}
                    ingredientRemove={this.removeIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;