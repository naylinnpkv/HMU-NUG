import Raffle from "../statics/raffle.png";
import html2canvas from "html2canvas";
import axios from "axios";
import { Button } from "antd";
import styles from "../statics/_ticket.css";
import React, { useState, useRef, useEffect } from "react";
import { TicketInputs } from "./TicketInputs";
import _ from "lodash";
import { ITicketInput } from "../models";

export const Ticket = () => {
  const [ticketNumber, setTicketNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [agentName, setAgentName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const printRef = useRef<any>();

  const sheetUrl =
    "https://sheet.best/api/sheets/6bdca4b6-2a5c-4f26-bbe5-22dff9091666";

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

  const getData = async () => {
    setLoading(true);
    const { data } = await axios.get<ITicketInput[]>(sheetUrl);

    if (data.length === 0) {
      setTicketNumber(_.toString(1).padStart(5, "0"));
      setLoading(false);
      return;
    }
    setTicketNumber(_.toString(data.length + 1).padStart(5, "0"));
    setLoading(false);
    return;
  };

  useEffect(() => {
    getData();
  }, [ticketNumber]);

  const postData = async () => {
    setLoading(true);
    const payLoad = { ticketNumber, name, country, contact, agentName };

    const { data } = await axios.post<ITicketInput[]>(sheetUrl, payLoad);

    setTicketNumber(_.toString(data.length + 1).padStart(5, "0"));
    setName("");
    setContact("");
    setAgentName("");
    setCountry("");
    setLoading(false);
  };

  return (
    <>
      <div className="head-image" style={{ maxWidth: "768px" }} ref={printRef}>
        <img src={Raffle} alt="Raffle" className="ticket" />
        <div className="text-on-image">
          <div className="text-on-image-innerwrapper">
            <p> {`${ticketNumber}`}</p>
            <p> {`${name}`}</p>
            <p> {`${country}`}</p>
            <p> {`${contact}`}</p>
          </div>
        </div>
      </div>
      <div className="formWrapper">
        <TicketInputs
          setTicketNumber={setTicketNumber}
          ticketNumber={ticketNumber}
          setName={setName}
          name={name}
          setCountry={setCountry}
          country={country}
          setContact={setContact}
          contact={contact}
          setAgentName={setAgentName}
          agentName={agentName}
        />
        <div className="ticket-input">
          <div className="download-button">
            <Button
              onClick={() => {
                handleDownloadImage();
                postData();
              }}
              type="primary"
              size="small"
              shape="round"
              style={{ minWidth: "150px" }}
              loading={loading}
            >
              Download Ticket in JPEG
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
