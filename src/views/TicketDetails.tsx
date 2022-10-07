import { Input, Button, Card, message } from "antd";
import React, { useState, useEffect } from "react";
import { ITicketData, ICountrySales } from "../models";
import "../statics/_ticket-details.css";
import _ from "lodash";
import axios from "axios";
import { TicketDetailsTable } from "./TicketDetailsTable";

const TicketDetails: React.FC = () => {
  const [searchVal, setSearchVal] = useState<ITicketData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [agentPin, setAgentPin] = useState<string>("");
  const [countrySales, setCountrySales] = useState<any>({});
  const { VITE_PUBLIC_SHEET_URL } = import.meta.env;

  const agentPins = [
    5110, 2031, 9691, 7673, 7834, 1655, 1090, 2090, 3090, 4090, 5090, 6090,
    3838, 3838, 7090, 1111,
  ];

  const totalCountrySales = async () => {
    setLoading(true);
    const output: any = {};
    const { data } = await axios.get<ITicketData[]>(VITE_PUBLIC_SHEET_URL);
    console.log("DATA", data);
    _.forEach(data, (x) => {
      if (!output[x.country as keyof typeof output]) {
        output[x.country as keyof typeof output] = 1;
      } else {
        output[x.country as keyof typeof output] += 1;
      }
    });
    setCountrySales(output);
    setLoading(false);
  };

  useEffect(() => {
    totalCountrySales();
  }, []);
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
    setLoading(false);
    return;
  };
  console.log("cCOutnere", countrySales);
  return (
    <>
      <div className="countryList">
        {_.map(countrySales, (x) => (
          <div>{x}</div>
        ))}
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
