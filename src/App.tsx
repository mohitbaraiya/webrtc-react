import React from "react";
import "./App.css";
import Header from "./componets/Header";
import ActiveUserPanel from "./componets/ActiveUserPanel";
import VideoChatContainer from "./componets/VideoChatContainer";
import SocketProvider from "./context/SocketProvider";

function App(): React.JSX.Element {
  return (
    <SocketProvider>
      <div className="container">
        <Header />
        <div className="content-container">
          <ActiveUserPanel />
          <VideoChatContainer />
        </div>
      </div>
    </SocketProvider>
  );
}

export default App;
