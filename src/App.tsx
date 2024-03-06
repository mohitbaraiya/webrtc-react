import React from "react";
import "./App.css";
import Header from "./componets/Header";
import ActiveUserPanel from "./componets/ActiveUserPanel";
import VideoChatContainer from "./componets/VideoChatContainer";

function App(): React.JSX.Element {
  return (
    <>
      <div className="container">
        <Header />
        <div className="content-container">
          <ActiveUserPanel />
          <VideoChatContainer />
        </div>
      </div>
    </>
  );
}

export default App;
