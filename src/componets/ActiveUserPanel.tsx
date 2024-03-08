import React, { useContext, useEffect, useState } from "react";
import styles from "./ActiveUserPanel.module.css";
import { SocketContext } from "../context/SocketProvider";
import classNames from "classnames";
interface User {
  id: string;
  username: string;
}
export default function ActiveUserPanel(): React.JSX.Element {
  const { socket } = useContext(SocketContext);
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserId, setActiveUserId] = useState<string>("");

  useEffect(() => {
    socket.on("update-user-list", ({ users }: { users: User[] }) => {
      setUsers(users.filter((user) => user.id !== socket.id));
    });
    return () => {};
  }, [socket]);
  function setActiveUser(
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): void {
    setActiveUserId(event.currentTarget.id);
  }
  return (
    <div className={styles["active-users-panel"]} id="active-user-container">
      <h3 className={styles["panel-title"]}>Active Users:</h3>
      <ul>
        {users.map((user) => (
          <li
            className={classNames("active-user", {
              "active-user--selected": activeUserId === user.id,
            })}
            key={user.id}
            id={user.id}
            onClick={setActiveUser}
          >
            <p className="username">
              Username: {user.username} <br /> Socket: {user.id}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
