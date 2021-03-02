import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    let appliedClasses = [classes.InputElement];

    if ( props.touched && props.invalid && props.shouldValidate) {
        appliedClasses.push(classes.Invalid);
    }

    switch(props.elementType) {
        case ('input'):
            inputElement = <input
                className={appliedClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={appliedClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (<select
                className={appliedClasses.join(' ')}
                value={props.value}
                onChange={props.changed} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value} >
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
            break;
        default:
            inputElement = <input
                className={appliedClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;