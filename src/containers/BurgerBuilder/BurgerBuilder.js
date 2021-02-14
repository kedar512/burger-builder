import { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 4
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
        });
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
        });
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;