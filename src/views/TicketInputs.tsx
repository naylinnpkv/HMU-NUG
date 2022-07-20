import _ from "lodash";
import React, { useState, ReactInstance, RefObject } from "react";
import "../statics/_ticket.css";
export const TicketInputs: React.FC<{
  setTicketNumber: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setContact: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setTicketNumber, setName, setContact, setCountry }) => {
  
  

  
  return (
    <div className="ticket-input">
      <div className="formInputWrapper">
        <p>Ticket Number:</p>
        {/* will be read-only when the sheet's api is setup */}
        <input type={'number'} min="1" max="5"
          onChange={(e) => {
            setTicketNumber(_.toString(e.currentTarget.value).padStart(5, "0"))
          }
          }
        />
      </div>
      
      <div className="formInputWrapper">
        <p>Name:</p>
        <input
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Customer Name"
        />
      </div>
      
      <div className="formInputWrapper">
        <p>Country:</p>
        <input
          onChange={(e) => setCountry(e.currentTarget.value)}
          placeholder="Origin of Customer"
        />
      </div>
      
      <div className="formInputWrapper">
        <p>Contact:</p>
        <input
          onChange={(e) => setContact(e.currentTarget.value)}
          placeholder="Contact of Customer"
        />
      </div>
      
      <div className="formInputWrapper">
        <p>Agent Name:</p>
        <input
          disabled
          onChange={(e) => setTicketNumber(e.currentTarget.value)}
          />
      </div>
    </div>
  );
};
