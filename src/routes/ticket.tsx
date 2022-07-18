import Raffle from "../statics/raffle.jpg";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import { Button } from "antd";
import "./ticket.css";
import { useState, useRef } from "react";
export const Ticket = () => {
  const [ticketNumber, setTicketNumber] = useState<string>("");
  const printRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className="ticket-container">
        <div className="head-image">
          <div ref={printRef}>
            <img src={Raffle} alt="Raffle" className="ticket" />
          </div>
        </div>
        <div className="text-on-image">
          <p>{`Ticket Number:${ticketNumber}`}</p>
        </div>
      </div>
      <div className="ticket-input">
        <input onChange={(e) => setTicketNumber(e.currentTarget.value)} />
      </div>
      <Button
        onClick={() => exportComponentAsJPEG(printRef)}
        className="pt-2  m-2"
        type="primary"
        size="middle"
        shape="default"
        style={{ minWidth: "150px" }}
      >
        Export As JPEG
      </Button>
    </>
  );
};
