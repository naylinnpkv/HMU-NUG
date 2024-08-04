import { Input, Button, Card, message } from "antd";
import React, { useState } from "react";
import { ITicketData } from "../models";
import "../statics/_ticket-details.css";
import _ from "lodash";
import axios from "axios";
import { TicketDetailsTable } from "./TicketDetailsTable";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const TicketDetails: React.FC = () => {
  const [searchVal, setSearchVal] = useState<ITicketData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [agentPin, setAgentPin] = useState<string>("");

  const { VITE_PUBLIC_SHEET_URL } = import.meta.env;

  const agentPins = [
    5110, 2031, 9691, 7673, 7834, 7090, 3838, 9010, 1655, 2010, 2020, 2030,
    2040, 2050, 2060, 2070, 2080, 2090, 3010,
  ];
  const adminPin = 9779;

  const submit = async () => {
    setLoading(true);
    if (
      !agentPins.includes(_.toNumber(agentPin)) &&
      agentPin !== _.toString(adminPin)
    ) {
      message.error("Invalid Agent Pin");
      setLoading(false);
      return;
    }

    const url =
      _.toNumber(agentPin) === adminPin // master key to retrieve all the sales
        ? VITE_PUBLIC_SHEET_URL
        : `${VITE_PUBLIC_SHEET_URL}/agentName/${agentPin}`;
    const { data } = await axios.get<ITicketData[]>(url);

    setSearchVal(data);
    setLoading(false);
    return;
  };

  return (
    <>
      <div className="back_button">
        <Link to="/">
          <Button
            type="text"
            size="large"
            shape="round"
            icon={<ArrowLeftOutlined />}
          >
            Back To Home
          </Button>
        </Link>
      </div>

      <div className="search-wrapper">
        <Input
          className="search-value"
          placeholder="Agent Number..."
          value={agentPin}
          onChange={(e) => setAgentPin(_.toString(e.currentTarget.value))}
          maxLength={4}
        />
        <Button
          size="small"
          shape="round"
          type="primary"
          onClick={submit}
          className="submit-button"
          disabled={agentPin.length > 3 ? false : true}
          loading={loading}
        >
          Submit
        </Button>
      </div>
      {searchVal.length > 0 && (
        <div>
          <p className="agent-sales">
            {_.toNumber(agentPin) === adminPin
              ? `Total Ticket Sale:${searchVal.length}`
              : `Agent has sold ${searchVal.length} tickets`}
          </p>

          <Card
            className="card"
            bodyStyle={{ maxHeight: "40em", overflow: "auto" }}
          >
            {/* <TicketDetailsTable
              searchVal={_.sortBy(searchVal, (val) =>
                _.toNumber(val.ticketNumber)
              )}
            /> */}
          </Card>
        </div>
      )}
    </>
  );
};

export default TicketDetails;
