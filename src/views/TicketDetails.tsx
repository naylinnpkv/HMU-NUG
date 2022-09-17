import { Input, Button, Card, message } from "antd";
import React, { useState } from "react";
import { ITicketData } from "../models";
import "../statics/_ticket-details.css";
import _ from "lodash";
import axios from "axios";
import { TicketDetailsTable } from "./TicketDetailsTable";

const TicketDetails: React.FC = () => {
  const [searchVal, setSearchVal] = useState<ITicketData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [agentPin, setAgentPin] = useState<string>("");

  const { VITE_PUBLIC_SHEET_URL } = import.meta.env;

  const searchByValues = [
    "Agent Number",
    "Country",
    "Ticket Number",
    "Customer Name",
  ];

  const agentPins = [
    5110, 2031, 9691, 7673, 7834, 1655, 1090, 2090, 3090, 4090, 5090, 6090,
    7090, 1111,
  ];

  const searchOptions = searchByValues.map((val) => ({
    label: val,
    value: val,
  }));

  const submit = async () => {
    setLoading(true);
    if (!agentPins.includes(_.toNumber(agentPin))) {
      message.error("Invalid Agent Pin");
      setLoading(false);
      return;
    }

    const url =
      _.toNumber(agentPin) === 1111
        ? VITE_PUBLIC_SHEET_URL
        : `${VITE_PUBLIC_SHEET_URL}/agentName/${agentPin}`;
    const { data } = await axios.get<ITicketData[]>(url);

    setSearchVal(data);
    console.log("SEARCH", searchVal);
    setLoading(false);
    return;
  };

  return (
    <>
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
            {_.toNumber(agentPin) === 1111
              ? `Total Ticket Sale:${searchVal.length}`
              : `Agent has sold ${searchVal.length} tickets`}
          </p>

          <Card
            className="card"
            bodyStyle={{ maxHeight: "40em", overflow: "auto" }}
          >
            <TicketDetailsTable
              searchVal={_.sortBy(searchVal, (val) =>
                _.toNumber(val.ticketNumber)
              )}
            />
          </Card>
        </div>
      )}
    </>
  );
};

export default TicketDetails;
