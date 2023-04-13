import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./BackButton.module.css";
import Button from "./Button";

const BackButton = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <Button variant="primary" className={styles.backButton} onClick={goBack}>
      <span className={styles.backIcon}>&#8592;</span> Back
    </Button>
  );
};

export default BackButton;
