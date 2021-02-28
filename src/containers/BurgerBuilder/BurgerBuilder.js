import { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.5,
    cheese: 1.0,
    meat: 1.0
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: error });
            });
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
        this.setState((prevState) => {
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

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //alert('You have purchased a delicous burger successfully!');
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(`${i}=${this.state.ingredients[i]}`);
        }

        queryParams.push(`price=${this.state.totalPrice}`);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`
        });
    }

    render() {

        let orderSummary = null;

        let burger = this.state.error ? <p>Cannot load ingredients</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (<Aux>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            ingredientAdded={this.addIngredientHandler}
                            order={this.purchaseHandler}
                            ingredientRemove={this.removeIngredientHandler} />
                    </Aux>);

            orderSummary = <OrderSummary
                                ingredients={this.state.ingredients}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.state.totalPrice} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }        

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);