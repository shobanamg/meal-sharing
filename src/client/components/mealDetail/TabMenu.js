import React, { useState } from "react";
import styles from "./TabMenu.module.css";

const TabMenu = ({ onReviewsTabClick, onReservationsTabClick }) => {
  const [activeTab, setActiveTab] = useState("reviews");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === "reviews") {
      onReviewsTabClick();
    } else if (tabName === "reservations") {
      onReservationsTabClick();
    }
  };

  return (
    <div className={styles.tabMenu}>
      <button
        className={activeTab === "reviews" ? styles.active : null}
        onClick={() => handleTabClick("reviews")}
      >
        Reviews
      </button>
      <button
        className={activeTab === "reservations" ? styles.active : null}
        onClick={() => handleTabClick("reservations")}
      >
        Reservations
      </button>
    </div>
  );
};

export default TabMenu;
