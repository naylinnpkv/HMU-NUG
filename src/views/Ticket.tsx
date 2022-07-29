import React, { useState, useRef, useEffect } from "react";
import Raffle from "../statics/raffle.jpg";
import html2canvas from "html2canvas";
import axios from "axios";
import { Button, Checkbox } from "antd";
import "../statics/_ticket.css";
import _ from "lodash";
import { ITicketInput } from "../models";

export const Ticket = () => {
  const [ticketNumber, setTicketNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [agentName, setAgentName] = useState<number>(0);
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
  const [multiTicketNums, setMultiTicketNums] = useState<string>("");
  const [nums, setNums] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const agentPins = [5110, 1655, 9691, 7673, 7834];
  const printRef = useRef<any>();

  const { VITE_SHEET_URL } = import.meta.env;

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
    const { data } = await axios.get<ITicketInput[]>(VITE_SHEET_URL);

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

  const multiPayloadGenerator = () => {
    const data = [];
    const latestNum = _.toNumber(ticketNumber) + nums - 1;
    for (let i = _.toNumber(ticketNumber); i < latestNum + 1; i++) {
      data.push({
        ticketNumber: i,
        name,
        country,
        contact,
        agentName,
      });
    }
    return data;
  };

  const postData = async () => {
    setLoading(true);
    const payLoad = isMultiple
      ? multiPayloadGenerator()
      : { ticketNumber, name, country, contact, agentName };

    const { data } = await axios.post<ITicketInput[]>(VITE_SHEET_URL, payLoad);

    setTicketNumber(_.toString(data.length + 1).padStart(5, "0"));
    setIsMultiple(false);
    setName("");
    setContact("");
    setAgentName(0);
    setCountry("");
    setLoading(false);
  };

  const toPrintText = (str: string) =>
    `${ticketNumber}-${_.toString(
      _.toNumber(str) + _.toNumber(ticketNumber) - 1
    ).padStart(5, "0")}`;

  const buttonIsDisabled =
    name.length < 1 ||
    contact.length < 1 ||
    country.length < 1 ||
    !agentPins.includes(agentName);

  return (
    <>
      <div className="head-image" style={{ maxWidth: "768px" }} ref={printRef}>
        <p className="in-the-ticket-region">
          {isMultiple ? multiTicketNums : ticketNumber}
        </p>
        <img src={Raffle} alt="Raffle" className="ticket" />
        <div className="text-on-image">
          <div className="text-on-image-innerwrapper">
            <p style={{ marginTop: "5px" }}>
              {isMultiple ? multiTicketNums : ticketNumber}
            </p>
            <p> {`${name}`}</p>
            <p> {`${country}`}</p>
            <p> {`${contact}`}</p>
          </div>
        </div>
      </div>
      <div className="formWrapper">
        <span>
          <Checkbox
            checked={isMultiple}
            onChange={() => setIsMultiple(!isMultiple)}
          >
            Print Multiple Tickets
          </Checkbox>
          {isMultiple && (
            <input
              type="string"
              placeholder="Number of Tickets"
              onChange={(e) => {
                setMultiTicketNums(toPrintText(e.currentTarget.value));
                setNums(_.toNumber(e.currentTarget.value));
              }}
            />
          )}
        </span>

        <div className="ticket-input">
          <div className="formInputWrapper">
            <p>Ticket Number:</p>
            {/* will be read-only when the sheet's api is setup */}
            <input
              type={"string"}
              readOnly
              value={isMultiple ? multiTicketNums : ticketNumber}
            />
          </div>
          <div className="formInputWrapper">
            <p>Name:</p>
            <input
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Customer Name"
              value={name}
            />
          </div>

          <div className="formInputWrapper">
            <p>Country:</p>
            <input
              onChange={(e) => setCountry(e.currentTarget.value)}
              placeholder="Origin of Customer"
              value={country}
            />
          </div>

          <div className="formInputWrapper">
            <p>Contact:</p>
            <input
              onChange={(e) => setContact(e.currentTarget.value)}
              placeholder="Contact of Customer"
              value={contact}
            />
          </div>

          <div className="formInputWrapper">
            <p>Agent Number:</p>
            <input
              placeholder="Agent(Ticket Seller Name)"
              onChange={(e) => setAgentName(_.toNumber(e.currentTarget.value))}
              value={agentName}
            />
          </div>
        </div>
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
              disabled={buttonIsDisabled}
            >
              Download Ticket in JPEG
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
