import NavItems from '../NavItems/NavItems';

import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';

const toolbar = (props) => (
    <header className={classes.Toolbar} >
        <div>MENU</div>
        <Logo />
        <nav>
            <NavItems />
        </nav>
    </header>
);

export default toolbar;