import { useState } from "react";
import styles from "./menu.module.css";


export function Menu() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
      setOpen(!open);
    };
  return (
    <>
      <div className={styles.drawer__overlay} onClick={toggleDrawer}></div>
      <div className={`${styles.drawer} ${open ? styles.drawer__open : ""}`}>
        <div className={styles.drawer__header}>
          <button className={styles.drawer__closeButton} onClick={toggleDrawer}>
            X
          </button>
        </div>
        <div className={styles.drawer__menu}>
          <div className={styles.menuItem}>menuItem1</div>
          <div className={styles.menuItem}>menuItem2</div>
          <div className={styles.menuItem}>menuItem3</div>
        </div>
      </div>
      <button className={styles.drawer__toggleButton} onClick={toggleDrawer}>
        <span className="material-icons">Menu MFE running on port 3004</span>
      </button>
    </>
  );
}
