import styles from "./Header.module.css";
import Image from "next/image";


export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Header MicrofrontEnd running port 3000</div>
    </header>
  );
}
