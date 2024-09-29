import { Button, Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import React, { useEffect, useState } from "react";
import { ITicketData } from "../models";
import "../statics/_ticket-details.css";
import _ from "lodash";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSale } from "../services/ticketService";
import { TicketDetailsTable } from "./TicketDetailsTable";

const TicketDetails: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tickets, setTickets] = useState<ITicketData[]>([]);

  const [ticketGroup, setTicketGroup] = useState<"10$" | "25$">("10$");

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isAdmin = currentUser?.admin;

  const getTickets = async (db: "10$" | "25$") => {
    if (!currentUser) return;
    const data = await getSale(db, currentUser?.userId);

    setTickets(data);
  };

  const onChange = (e: RadioChangeEvent) => {
    setTicketGroup(e.target.value);
  };

  useEffect(() => {
    getTickets(ticketGroup);
  }, [currentUser, ticketGroup]);

  return (
    <div className="container">
      <div style={{ margin: "10px" }}>
        <Button
          size="large"
          type="primary"
          onClick={() => navigate("/")}
          shape="round"
          icon={<ArrowLeftOutlined />}
        >
          Home
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            margin: "20px",
            fontSize: "17px",
            fontWeight: "600",
            color: "teal",
          }}
        >
          {currentUser?.name}
        </div>
        <Radio.Group onChange={onChange} value={ticketGroup}>
          <Radio value={"10$"}>10$ Tickets</Radio>
          <Radio value={"25$"}>25$ Tickets</Radio>
        </Radio.Group>
      </div>
      <TicketDetailsTable
        tickets={tickets}
        isAdmin={isAdmin === true}
        ticketGroup={ticketGroup}
        setTickets={setTickets}
      />
    </div>
  );
};

export default TicketDetails;
