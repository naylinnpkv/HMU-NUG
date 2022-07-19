import _ from "lodash";
import React, { ReactInstance, RefObject } from "react";
import "../statics/_ticket.css";
export const TicketInputs: React.FC<{
  setTicketNumber: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setContact: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setTicketNumber, setName, setContact, setCountry }) => {
  return (
    <div className="ticket-input">
      <p>Ticket Number:</p>
      {/* will be read-only when the sheet's api is setup */}
      <input
        onChange={(e) =>
          setTicketNumber(_.toString(e.currentTarget.value).padStart(5, "0"))
        }
      />
      <p>Name:</p>
      <input
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Customer Name"
      />
      <p>Country:</p>
      <input
        onChange={(e) => setCountry(e.currentTarget.value)}
        placeholder="Origin of Customer"
      />
      <p>Contact:</p>
      <input
        onChange={(e) => setContact(e.currentTarget.value)}
        placeholder="Contact of Customer"
      />
      <p>Agent Name:</p>
      <input
        disabled
        onChange={(e) => setTicketNumber(e.currentTarget.value)}
      />
    </div>
  );
};
