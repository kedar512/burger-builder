import Aux from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
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
        </Aux>
    );
}

export default orderSummary;