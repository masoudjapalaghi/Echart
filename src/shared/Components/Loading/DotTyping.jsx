// Styles
import styles from "./Loading.module.css";

export const DotTyping = () => {
  return (
    <div className="w-24">
      <div className={styles.snippet} data-title=".dot-typing">
        <div className={styles.stage}>
          <div className={styles.dot_typing}></div>
        </div>
      </div>
    </div>
  );
};
