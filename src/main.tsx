import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import { TicketHome } from "./routes/TicketHome";
import TicketDetails from "./views/TicketDetails";
import { Raffle } from "./views/Raffle";
import mhu_logo from "./statics/mhu_logo.png";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* <img src={mhu_logo} alt="MHU Logo" /> */}
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<TicketHome />} />
          {/* <Route path="/ticket" element={<TicketHome />} /> */}
          <Route path="/ticket/details" element={<TicketDetails />} />
          {/* <Route path="/raffle-generator" element={<Raffle />} /> */}
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </>
);
