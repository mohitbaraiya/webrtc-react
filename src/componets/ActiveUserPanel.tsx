import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./ActiveUserPanel.module.css";
import { SocketContext } from "../context/SocketProvider";
import classNames from "classnames";
interface User {
  id: string;
  username: string;
}
export default function ActiveUserPanel(): React.JSX.Element {
  const { socket, peer } = useContext(SocketContext);
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserId, setActiveUserId] = useState<string>("");
  const [isAlreadyCalling, setIsAlreadyCalling] = useState<boolean>(false);

  useEffect(() => {
    socket.on("update-user-list", ({ users }: { users: User[] }) => {
      setUsers(users.filter((user) => user.id !== socket.id));
    });

    return () => {};
  }, [socket]);
  const callUser = useCallback(
    async (socketId: string): Promise<void> => {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(new RTCSessionDescription(offer));

      socket.emit("call-user", {
        offer,
        to: socketId,
      });
    },
    [socket, peer]
  );
  useEffect(() => {
    socket.on("call-made", async (data) => {
      await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(new RTCSessionDescription(answer));

      socket.emit("make-answer", {
        answer,
        to: data.socket,
      });
    });

    return () => {};
  }, [socket, peer]);

  useEffect(() => {
    socket.on("answer-made", async (data) => {
      await peer.setRemoteDescription(new RTCSessionDescription(data.answer));

      if (!isAlreadyCalling) {
        callUser(data.socket);
        setIsAlreadyCalling(true);
      }
    });
  }, [socket, peer, callUser, isAlreadyCalling]);

  async function callUserOnClick(
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): Promise<void> {
    const socketId = event.currentTarget.id;
    callUser(socketId);
    setActiveUserId(socketId);
    // create offer
    const offer = await peer.createOffer();
    await peer.setLocalDescription(new RTCSessionDescription(offer));

    socket.emit("call-user", {
      offer,
      to: socketId,
    });
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
            onClick={callUserOnClick}
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
