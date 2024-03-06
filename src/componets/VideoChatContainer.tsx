import React from "react";
import styles from "./VideoChatContainer.module.css";
export default function VideoChatContainer(): React.JSX.Element {
  return (
    <div className={styles["video-chat-container"]}>
      <h2 className={styles["talk-info"]} id="talking-with-info">
        Select active user on the left menu.
      </h2>
      <div>
        <video
          autoPlay
          className={styles["remote-video"]}
          id="remote-video"
        ></video>
        <video
          autoPlay
          muted
          className={styles["local-video"]}
          id="local-video"
        ></video>
      </div>
    </div>
  );
}
