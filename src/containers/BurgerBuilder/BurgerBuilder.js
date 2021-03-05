import { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        /* axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: error });
            }); */
    }

    updatePurchasableState = () => {
        let ingredientCount = Object.keys(this.props.ings)
                    .map( igKey => this.props.ings[igKey])
                    .reduce( (sum, el) => sum + el , 0);
        return ingredientCount > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {

        let orderSummary = null;

        let burger = this.state.error ? <p>Cannot load ingredients</p> : <Spinner />;

        if (this.props.ings) {
            burger = (<Aux>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls
                            ingredients={this.props.ings}
                            price={this.props.price}
                            purchasable={this.updatePurchasableState()}
                            ingredientAdded={this.props.onIngredientAdded}
                            order={this.purchaseHandler}
                            ingredientRemove={this.props.onIngredientRemoved} />
                    </Aux>);

            orderSummary = <OrderSummary
                                ingredients={this.props.ings}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.props.price} />;
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        onIngredientAdded: (ingName) => dispatchEvent({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatchEvent({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));