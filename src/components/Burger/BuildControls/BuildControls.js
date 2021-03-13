import classes from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map( control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    ingredientCount={props.ingredients[control.type]}
                    added={ () => props.ingredientAdded(control.type) }
                    removed={ () => props.ingredientRemove(control.type) } />
            ))}
            <button
            className={classes.OrderButton}
            onClick={props.order}
            disabled={!props.purchasable}>{ props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    );
}

export default buildControls;