import React from 'react';
import styles from './Footer.module.css';

const Footer = ()=>{
    return(
        <div className={styles.footer}>
            <p>Meal <span>Sharing</span>app <span>2023 &copy;</span></p>
        </div>
    )
}

export default Footer;