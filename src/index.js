import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/authContext";
import { RecordingContextProvider } from "./Context/recordingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <RecordingContextProvider>
          <App />
        </RecordingContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
