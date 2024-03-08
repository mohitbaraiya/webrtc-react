import { Socket, io } from "socket.io-client";

import React, { useEffect, useState } from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  extraHeaders: {
    "ngrok-skip-browser-warning": "69420",
  },
});

interface DefaultValue {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  socketConnect: boolean;
}
export const SocketContext = React.createContext<DefaultValue>({
  socket: socket,
  socketConnect: false,
});
export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [socketConnect, setSocketConnect] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(true);

  const value: DefaultValue = {
    socket: socket,
    socketConnect: socketConnect,
  };
  useEffect(() => {
    if (socketConnect) {
      return;
    }
    socket.on("connect", () => {
      setSocketConnect(true);
      console.log(socket);
    });
    return () => {
      setSocketConnect(false);
    };
  }, [socketConnect]);
  function formSubmitEvent(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(username);
    setShowModal(false);
    const enteredUsername: string = username;
    socket.emit("add-user", { username: enteredUsername, id: socket.id });
  }
  return (
    <SocketContext.Provider value={value}>
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Enter Your Name</h3>
            <p>
              Enter your name so other user can recognised you easilly or you
              can continue with unique id "<mark>{socket.id}</mark>".
            </p>
            <form onSubmit={formSubmitEvent} className="user-info-form">
              <div>
                <input
                  id="username"
                  name="username"
                  className="theme-input"
                  type="Enter Your Name"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="form-actions">
                <button className="theme-button" type="submit">
                  CONTINUE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {children}
    </SocketContext.Provider>
  );
}
