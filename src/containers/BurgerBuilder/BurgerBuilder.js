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
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchasableState = () => {
        let ingredientCount = Object.keys(this.props.ings)
                    .map( igKey => this.props.ings[igKey])
                    .reduce( (sum, el) => sum + el , 0);
        return ingredientCount > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/login');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {

        let orderSummary = null;

        let burger = this.props.error ? <p>Cannot load ingredients</p> : <Spinner />;

        if (this.props.ings) {
            burger = (<Aux>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls
                            isAuth={this.props.isAuthenticated}
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

        /* if (this.state.loading) {
            orderSummary = <Spinner />;
        } */        

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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        onIngredientAdded: (ingName) => dispatchEvent(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatchEvent(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatchEvent(actions.initIngredients()),
        onInitPurchase: () => dispatchEvent(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatchEvent(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));