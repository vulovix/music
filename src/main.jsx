import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CommunicationProvider from "./providers/Communication";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CommunicationProvider>
      <App />
    </CommunicationProvider>
  </React.StrictMode>
);
