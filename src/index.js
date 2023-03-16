import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ConnectionContextProvider from "./components/ConnectionContext";
import PostContextProvider from "./components/PostContext";
import ChatContextProvider from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConnectionContextProvider>
    <ChatContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </ChatContextProvider>
  </ConnectionContextProvider>
);
