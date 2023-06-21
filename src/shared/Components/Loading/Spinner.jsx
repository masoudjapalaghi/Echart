import React from "react";

// Styles 
import styles from "./Loading.module.css"

export const Spinner = ({width="w-6",height="h-6"}) => {
  return (
    <div className={`${styles.spinner} ${width} ${height}`}></div>
  );
};
