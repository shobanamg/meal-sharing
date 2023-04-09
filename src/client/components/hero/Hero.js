import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Share a Meal, Share Happiness</h1>
        <p className={styles.heroSubtitle}>
          Connect with people around you over a delicious home-cooked meal.
        </p>
      </div>
      <div className={styles.heroImage}></div>
    </div>
  );
};

export default Hero;
