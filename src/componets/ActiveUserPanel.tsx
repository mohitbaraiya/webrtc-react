import React from "react";
import styles from "./ActiveUserPanel.module.css";
export default function ActiveUserPanel(): React.JSX.Element {
  return (
    <div className={styles["active-users-panel"]} id="active-user-container">
      <h3 className={styles["panel-title"]}>Active Users:</h3>
      <div className="active-user active-user--selected" id="socketid">
        <p className="username">
          Username: username <br /> Socket: $socketId
        </p>
      </div>
      <div className="active-user" id="socketid">
        <p className="username">
          Username: username <br /> Socket: $socketId
        </p>
      </div>
      <div className="active-user" id="socketid">
        <p className="username">
          Username: username <br /> Socket: $socketId
        </p>
      </div>
    </div>
  );
}
