import classes from './Order.module.css';

const order = (props) => {

    let ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    let allIngredients = ingredients.map(ig => (
        <span key={ig.name} style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            border: '1px solid #ccc',
            margin: '0 8px',
            padding: '5px'
        }}>
            {ig.name} ({ig.amount})
        </span>
    ));

    return(
        <div className={classes.Order}>
            <p>Ingredients: {allIngredients}</p>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;