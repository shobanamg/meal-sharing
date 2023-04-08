import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Navbar.module.css';


const Navbar = ({toggleMenu, isMenuOpen}) => {
    return (
        <div className={styles.allContainer}>
            <header className={styles.header}>
                <nav className={styles.nav}>

                    <button
                        className={`${styles.burger} ${isMenuOpen ? styles.open : ''}
                        ${isMenuOpen ? styles.burgerOpen : styles.burgerClose}`}
                        onClick={toggleMenu}
                    >
                        <span className={styles.line}></span>
                        <span className={styles.line}></span>
                        <span className={styles.line}></span>
                    </button>
                    <h1 className={styles.logo}>Meal Sharing App</h1>
                    <ul className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
                        <li className={styles.menuItem}>
                            <Link onClick={toggleMenu} to="/">Home</Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link onClick={toggleMenu} to="/meals">Meals</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;