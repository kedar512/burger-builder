import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.5,
    cheese: 1.0,
    meat: 1.0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = state.ingredients[action.ingredientName] + 1;
            const newIngredients = {
                ...state.ingredients,
                [action.ingredientName]: updatedIngredient
            }
            const updatedState = {
                ingredients: newIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = state.ingredients[action.ingredientName] - 1;
            const newIngs = {
                ...state.ingredients,
                [action.ingredientName]: updatedIng
            }
            const updatedSt = {
                ingredients: newIngs,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedSt);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true, building: false });
        default:
            return state;
    }
}

export default reducer;