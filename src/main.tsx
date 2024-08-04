import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Layout from "./views/Navigation";
import "./index.css";
import "antd/dist/antd.css";
import { TicketHome } from "./routes/TicketHome";
import TicketDetails from "./views/TicketDetails";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* <img src={mhu_logo} alt="MHU Logo" /> */}
    <BrowserRouter>
      <React.StrictMode>
        <AuthProvider>
          {/* <Layout> */}
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/create-ticket" element={<TicketHome />} />
            <Route path="/ticket/details" element={<TicketDetails />} />
            {/* <Route path="/raffle-generator" element={<Raffle />} /> */}
          </Routes>
          {/* </Layout> */}
        </AuthProvider>
      </React.StrictMode>
    </BrowserRouter>
  </>
);
