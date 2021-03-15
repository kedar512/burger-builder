import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses.splice(attachedClasses.length - 1, 1, classes.Open);
    }

    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;