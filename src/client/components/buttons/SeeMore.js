import React from "react";
import {Link} from "react-router-dom";
import styles from "./SeeMore.module.css";

const SeeMoreButton = ({to}) => (
    <div className={styles.seeMoreButtonContainer}>
        <Link to={to} className={styles.seeMoreButton}>
            See more <span className={styles.arrow}>&rarr;</span>
        </Link>
    </div>
);

export default SeeMoreButton;
