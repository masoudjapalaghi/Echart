import React from "react";
// Styles
import styles from "./Loading.module.css";

export const DotPulse = () => {
  return (
    <div className="w-24">
      <div className={styles.snippet}>
        <div className={styles.stage}>
          <div className={styles.dot_pulse} />
        </div>
      </div>
    </div>
  );
};
