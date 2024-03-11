import React, { useContext, useEffect, useRef } from "react";
import styles from "./VideoChatContainer.module.css";
import { SocketContext } from "../context/SocketProvider";
export default function VideoChatContainer(): React.JSX.Element {
  const remoteVideoRef: React.LegacyRef<HTMLVideoElement> = useRef(null);
  const localVideoRef: React.LegacyRef<HTMLVideoElement> = useRef(null);
  const { peer } = useContext(SocketContext);

  useEffect(() => {
    const localVideo = localVideoRef.current;
    const remoteVideo = remoteVideoRef.current;
    if (!localVideo || !remoteVideo) {
      return;
    }
    const usermediaParams = { video: true, audio: true };
    function userMediaListener(stream: MediaStream | void): void {
      console.log(stream);

      if (localVideo && stream) {
        localVideo.srcObject = stream;
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));
      }
    }
    function usermediaErrorHandler(error: string | object) {
      console.error(error);
    }
    let getMediaFunction:
      | "getUserMedia"
      | "mozGetUserMedia"
      | "webkitGetUserMedia" = "getUserMedia";
    if (typeof navigator?.mozGetUserMedia === "function") {
      getMediaFunction = "mozGetUserMedia";
    } else if (typeof navigator?.webkitGetUserMedia === "function") {
      getMediaFunction = "webkitGetUserMedia";
    }
    console.log(typeof navigator[getMediaFunction]);
    if (typeof navigator[getMediaFunction] === "function") {
      navigator[getMediaFunction](
        usermediaParams,
        userMediaListener,
        usermediaErrorHandler
      );
    }
  }, [peer]);

  useEffect(() => {
    peer.ontrack = function ({ streams: [stream] }) {
      const remoteVideo = remoteVideoRef.current;
      if (remoteVideo) {
        remoteVideo.srcObject = stream;
      }
    };
  }, [peer]);
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
          ref={remoteVideoRef}
        ></video>
        <video
          autoPlay
          muted
          className={styles["local-video"]}
          ref={localVideoRef}
          id="local-video"
        ></video>
      </div>
    </div>
  );
}
