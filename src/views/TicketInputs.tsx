import _ from "lodash";
import React, { useState, ReactInstance, RefObject } from "react";
import "../statics/_ticket.css";
import { ITicketInput } from "../models";

export const TicketInputs: React.FC<{
  setTicketNumber: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setContact: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setAgentName: React.Dispatch<React.SetStateAction<string>>;
  ticketNumber: string;
  name: string;
  contact: string;
  country: string;
  agentName: string;
}> = ({
  setTicketNumber,
  setName,
  setContact,
  setCountry,
  setAgentName,
  ticketNumber,
  name,
  contact,
  country,
  agentName,
}) => {
  return (
    <div className="ticket-input">
      <div className="formInputWrapper">
        <p>Ticket Number:</p>
        {/* will be read-only when the sheet's api is setup */}
        <input type={"string"} readOnly value={ticketNumber} />
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
        <p>Agent Name:</p>
        <input
          onChange={(e) => setAgentName(e.currentTarget.value)}
          value={agentName}
        />
      </div>
    </div>
  );
};
