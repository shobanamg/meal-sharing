import React, { useState } from "react";
import styles from "./TabMenu.module.css";
import { Reviews } from "../review/Reviews";
import ReservationForm from "../reservation/ReservationForm";

const TabMenu = ({ mealId, availableSpots }) => {
  const [activeTab, setActiveTab] = useState("reviews");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
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
      {activeTab === "reviews" && <Reviews mealId={mealId} />}
      {activeTab === "reservations" && (
        <ReservationForm mealId={mealId} availableSpots={availableSpots} />
      )}
    </>
  );
};

export default TabMenu;
