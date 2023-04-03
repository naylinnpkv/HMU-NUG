import React, { useState, useRef, useEffect } from "react";

import html2canvas from "html2canvas";
import axios from "axios";
import { Button, Checkbox, Select, Spin } from "antd";
import "../statics/_ticket.css";
import _ from "lodash";
import { ITicketData } from "../models";
import { TicketImage } from "./TicketImage";
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
  const [countrySales, setCountrySales] = useState<any>({});

  const agentPins = [
    5110, 2031, 9691, 7673, 7834, 1655, 1090, 2090, 3090, 4090, 5090, 6090,
    7090, 3838,
  ];

  // const raffleTicket = isJapan ? JapanRaffle : Raffle;
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
    const temp: { [key: string]: number } = {};
    const output: any = [];
    const { data } = await axios.get<ITicketData[]>(VITE_PUBLIC_SHEET_URL);

    if (data.length === 0) {
      setTicketNumber(_.toString(1).padStart(5, "0"));
      setLoading(false);
      return;
    }
    _.forEach(data, (x) => {
      if (!temp[_.trim(x.country) as keyof typeof temp]) {
        temp[x.country as keyof typeof temp] = 1;
      } else {
        temp[_.trim(x.country) as keyof typeof temp] += 1;
      }
    });

    for (const property in temp) {
      output.push({ country: property, sale: _.toNumber(temp[property]) });
    }
    setCountrySales(_.orderBy(output, ["sale"], ["desc"]));
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
    <div className="form_wrapper">
      <div className="countries_data">
        <ul className="wrapper">
          {loading ? (
            <Spin size="large" />
          ) : (
            _.map(countrySales, (x) => (
              <li className="countryList" key={x.country}>
                <div>{x.country}</div>
                <div>{`${x.sale} tickets sold`}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="ticket_form">
        <TicketImage
          isMultiple={isMultiple}
          multiTicketNums={multiTicketNums}
          ticketNumber={ticketNumber}
          name={name}
          printRef={printRef}
          country={country}
          contact={contact}
        />
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
            {/* <Checkbox checked={isJapan} onChange={() => setIsJapan(!isJapan)}>
              Japan Agent
            </Checkbox> */}
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
                onChange={(e) =>
                  setAgentName(_.toNumber(e.currentTarget.value))
                }
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
            </div>
            <Button
              className="details-button"
              shape="round"
              type="link"
              onClick={() => navigate("/ticket/details")}
            >
              View Ticket Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
