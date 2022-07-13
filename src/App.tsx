import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import { Ticket } from "./views/Ticket";
function App() {
  return (
    <div className="App">
      <Ticket />
    </div>
  );
}

export default App;
