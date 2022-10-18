import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import { TicketHome } from "./routes/TicketHome";
import TicketDetails from "./views/TicketDetails";
import { Raffle } from "./views/Raffle";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ticket" element={<TicketHome />} />
        <Route path="/ticket/details" element={<TicketDetails />} />
        <Route path="/raffle-generator" element={<Raffle />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);
