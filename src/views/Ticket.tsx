import React, { useState, useRef, useEffect } from "react";
import Raffle from "../statics/raffle.jpg";
import JapanRaffle from "../statics/japan_raffle.jpg";
import html2canvas from "html2canvas";
import axios from "axios";
import { Button, Checkbox, Select } from "antd";
import "../statics/_ticket.css";
import _ from "lodash";
import { ITicketData } from "../models";
import countries from "../countries.json";
import { useNavigate } from "react-router-dom";

export const Ticket = () => {
  const [ticketNumber, setTicketNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [agentName, setAgentName] = useState<number>(0);
  const [isMultiple, setIsMultiple] = useState<boolean>(false);
  const [isJapan, setIsJapan] = useState<boolean>(false);
  const [multiTicketNums, setMultiTicketNums] = useState<string>("");
  const [nums, setNums] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const agentPins = [
    5110, 2031, 9691, 7673, 7834, 1655, 1090, 2090, 3090, 4090, 5090, 6090,
    7090,
  ];

  const raffleTicket = isJapan ? JapanRaffle : Raffle;
  const printRef = useRef<any>();

  const { VITE_PUBLIC_SHEET_URL } = import.meta.env;
  const navigate = useNavigate();
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
    const { data } = await axios.get<ITicketData[]>(VITE_PUBLIC_SHEET_URL);
    console.log(countries[2]);
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

    const { data } = await axios.post<ITicketData[]>(
      VITE_PUBLIC_SHEET_URL,
      payLoad
    );

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
        <img src={raffleTicket} alt="Raffle" className="ticket" />
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
          <Checkbox checked={isJapan} onChange={() => setIsJapan(!isJapan)}>
            Japan Agent
          </Checkbox>
        </span>

        <div className="ticket-input">
          <div className="formInputWrapper">
            <p>Ticket Number:</p>
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
            <Select
              listHeight={128}
              style={{ width: "100%" }}
              dropdownMatchSelectWidth
              showSearch
              placeholder="Select a country"
              options={countries.map((x) => ({
                label: x.name,
                value: x.code === "AE" ? "UAE" : x.name,
              }))}
              size="large"
              onSelect={(e: any) => setCountry(e)}
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
              maxLength={4}
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

            <Button
              className="details-button"
              size="small"
              shape="round"
              type="link"
              onClick={() => navigate("/ticket/details")}
            >
              View Ticket Details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
