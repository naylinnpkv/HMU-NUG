import Raffle from "../statics/raffle.jpg";
import html2canvas from "html2canvas";
import { Button } from "antd";
import "../statics/_ticket.css";
import { useState, useRef } from "react";
import { TicketInputs } from "./TicketInputs";
export const Ticket = () => {
  const [ticketNumber, setTicketNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const printRef = useRef<any>();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <>
      <div className="head-image" style={{ maxWidth: "768px" }} ref={printRef}>
        <img src={Raffle} alt="Raffle" className="ticket" />
        <div className="text-on-image">
          <p> {`Ticket Number:${ticketNumber}`}</p>
          <p> {`Name:${name}`}</p>
          <p> {`Country:${country}`}</p>
          <p> {`Contact:${contact}`}</p>
        </div>
      </div>
      <TicketInputs
        setTicketNumber={setTicketNumber}
        setName={setName}
        setCountry={setCountry}
        setContact={setContact}
      />
      <div className="ticket-input">
        <div className="download-button">
          <Button
            onClick={handleDownloadImage}
            type="primary"
            size="small"
            shape="round"
            style={{ minWidth: "150px" }}
          >
            Download Ticket in JPEG
          </Button>
        </div>
      </div>
    </>
  );
};
