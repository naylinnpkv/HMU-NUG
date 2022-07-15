import { useState } from "react";
import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import { Home } from "./views/Home";
function App() {
  return (
    <div className="App ticket-button">
      <Home />
    </div>
  );
}

export default App;
