import NavItem from './NavItem/NavItem';

import classes from './NavItems.module.css';

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem link='/' exact >Burger Builder</NavItem>
        <NavItem link='/orders' >Orders</NavItem>
        <NavItem link='/login' >Login</NavItem>
    </ul>
);

export default navItems;