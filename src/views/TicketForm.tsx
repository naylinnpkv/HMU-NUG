import React, { useState, useRef, useEffect } from "react";

import html2canvas from "html2canvas";
import { Button, Checkbox, Select, Spin } from "antd";
import "../statics/_ticket.css";
import _ from "lodash";
import { useAuth } from "../context/AuthContext";
import { ITicketData } from "../models";
import { TicketImage } from "./TicketImage";
import countries from "../countries.json";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  createTicket,
  getLastEndingTicketNum,
} from "../services/ticketService";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";

export const Ticket: React.FC<{ ticketType: string }> = ({ ticketType }) => {
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [agentName, setAgentName] = useState<number>(0);
  const [isMultiple, setIsMultiple] = useState<boolean>(true);
  const [isJapan, setIsJapan] = useState<boolean>(false);
  const [nums, setNums] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [is10$ticket, setIs10$ticket] = useState<boolean>(
    ticketType.length > 0 && ticketType !== "is25$ticket"
  );
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

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

  const getLatestTicketNum = async () => {
    setLoading(true);
    const totalTicketsCount = await getLastEndingTicketNum(
      is10$ticket ? "10$" : "25$"
    );

    if (totalTicketsCount !== undefined && totalTicketsCount) {
      setTicketNumber(totalTicketsCount);
    } else {
      setTicketNumber(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLatestTicketNum();
  }, [is10$ticket]);

  const handleTicket = async () => {
    setLoading(true);

    if (!ticketNumber && !currentUser) {
      return;
    } else {
      const ticketData: ITicketData = {
        name,
        startingTicketNum: ticketNumber || 0,
        endingTicketNum: ticketNumber ? ticketNumber + (nums - 1) : 0,
        numberofTickets: nums,
        contact,
        country,
        creatorId: currentUser?.userId,
      };
      const createdTicket = await createTicket(
        ticketData,
        is10$ticket ? "10$" : "25$"
      );
      if (createdTicket) {
        setTicketNumber(createdTicket.endingTicketNum + 1);
      }
    }

    setNums(5);
    setName("");
    setContact("");
    setAgentName(0);
    setCountry("");
    setLoading(false);
  };

  const buttonIsDisabled =
    name.length < 1 || contact.length < 1 || country.length < 1 || nums < 1;

  if (loading) return <Spin size="large" style={{ marginTop: "50%" }} />;

  return (
    <>
      <div className="header_menu_wrapper">
        <div style={{ marginLeft: "20px" }}>
          <Button
            size="large"
            type="primary"
            onClick={() => navigate(-1)}
            shape="round"
            icon={<ArrowLeftOutlined />}
          >
            Back
          </Button>
        </div>
        <div>
          Welcome {currentUser?.name!}!
          <Link to="/ticket/details" target="_blank">
            <Button
              size="large"
              shape="round"
              type="primary"
              className="header-menu_buttons"
            >
              View Ticket Sales
            </Button>
          </Link>
          <Button
            size="large"
            shape="round"
            danger
            type="default"
            className="header-menu_buttons"
            onClick={() => logout()}
          >
            Log Out
          </Button>
        </div>
      </div>

      <div className="form_wrapper">
        <div className="ticket_form">
          <TicketImage
            isMultiple={isMultiple}
            multiTicketNums={
              nums > 0 && ticketNumber
                ? `${_.toString(ticketNumber)} - ${_.toString(
                    ticketNumber + (nums - 1)
                  )}`
                : ""
            }
            is10$ticket={is10$ticket}
            ticketNumber={_.toString(ticketNumber)}
            name={name}
            isJapan={isJapan}
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
                  type="number"
                  placeholder="Number of Tickets"
                  value={nums}
                  onChange={(e) => {
                    setNums(_.toNumber(e.currentTarget.value));
                  }}
                />
              )}

              {/* // temporarily removing the Japan ticket 
              <Checkbox checked={isJapan} onChange={() => setIsJapan(!isJapan)}>
                Japan Agent
              </Checkbox> */}
              {/* <Checkbox
                checked={is10$ticket}
                onChange={() => setIs10$ticket(!is10$ticket)}
              >
                10$ Ticket
              </Checkbox> */}
            </span>

            <div className="ticket-input">
              <div className="formInputWrapper">
                <p>Ticket Number:</p>
                {ticketNumber && isMultiple ? (
                  <input
                    type={"string"}
                    readOnly
                    value={
                      ticketNumber
                        ? `${_.toString(ticketNumber)} - ${_.toString(
                            ticketNumber + (nums - 1)
                          )}`
                        : ""
                    }
                  />
                ) : (
                  <input type="number" readOnly value={ticketNumber || 0} />
                )}
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
                <div style={{ display: "flex" }}>
                  <p>Contact:</p>
                </div>
                <input
                  onChange={(e) => setContact(e.currentTarget.value)}
                  placeholder="Contact of Customer"
                  value={contact}
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="download-button">
              <Button
                onClick={() => {
                  handleDownloadImage();
                  handleTicket();
                }}
                type="primary"
                size="small"
                shape="round"
                style={{ minWidth: "150px" }}
                loading={loading}
                disabled={buttonIsDisabled}
              >
                Create and Download Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
