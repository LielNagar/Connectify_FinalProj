import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ConnectionContextProvider from "./components/ConnectionContext";
import PostContextProvider from "./components/PostContext";
import ChatContextProvider from "./context/ChatContext";
import ImageContextProvider from "./context/ImageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConnectionContextProvider>
  <ImageContextProvider>
    <ChatContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </ChatContextProvider>
    </ImageContextProvider>
  </ConnectionContextProvider>
);
