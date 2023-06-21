// Styles
import styles from "./form.module.css";

export const RadioBoxButton = ({ label, id,width="w-32", className="",...rest }) => {
  return (
    <div className={`flex items-center gap-2 relative h-max ${width} ${className}`}>
      <input type="radio" name="select"  className={`hidden ${styles.radioButton} `} id={id} {...rest} />
      <label htmlFor={id} className={`${styles.option} ${width}`} >
        <span>{label}</span>
      </label>
    </div>
  );
};

