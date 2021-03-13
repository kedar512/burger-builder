import NavItem from './NavItem/NavItem';

import classes from './NavItems.module.css';

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem link='/' exact >Burger Builder</NavItem>
        { props.isAuthenticated ? <NavItem link='/orders' >Orders</NavItem> : null}
        { props.isAuthenticated ? 
            <NavItem link='/logout' >Logout</NavItem> :
            <NavItem link='/login' >Login</NavItem>
        }
    </ul>
);

export default navItems;