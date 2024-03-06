import React from "react";
import styles from "./Header.module.css";
export default function Header(): React.JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles["logo-container"]}>
        <img
          src="/img/logo.png"
          alt="doge logo"
          className={styles["logo-img"]}
        />
        <h1 className={styles["logo-text"]}>
          Video<span className={styles["logo-highlight"]}>Chat</span>
        </h1>
      </div>
    </header>
  );
}
