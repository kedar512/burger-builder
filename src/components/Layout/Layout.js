import Aux from '../../hoc/Auxiliary';

import classes from './Layout.module.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, Side drawer and backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;