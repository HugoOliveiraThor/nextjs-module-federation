import styles from "./Header.module.css";


export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Header MicrofrontEnd running port 3000</div>
    </header>
  );
}
