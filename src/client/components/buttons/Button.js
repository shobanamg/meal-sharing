import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, variant }) => {
  const buttonClass = variant === "primary" ? styles.primary : styles.secondary;
  return (
    <button className={`${styles.button} ${buttonClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
