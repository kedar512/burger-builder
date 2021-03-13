import NavItems from '../NavItems/NavItems';
import HamburgerIcon from '../../UI/HamburgerIcon/HamburgerIcon';

import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';

const toolbar = (props) => (
    <header className={classes.Toolbar} >
        <HamburgerIcon clicked={props.toggleDrawer} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;