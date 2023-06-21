import React, { useState } from "react";
import styles from "./form.module.css";

export const ColorPicker = ({ ...rest }) => {
  const [color, setColor] = useState("#FFFFFF");

  const handleInput = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-start text-[#404040] text-xs whitespace-nowrap w-14">انتخاب رنگ</label>
      <div className={styles.colorPicker}>
        <input type="color" className={styles.inputColor} onChange={handleInput} value={color} />
        <input
          type="text"
          className={styles.inputeTextColor}
          placeholder="Hex"
          onChange={handleInput}
          value={color}
          style={{ color: color }}
          {...rest}
        />
      </div>
    </div>
  );
};
