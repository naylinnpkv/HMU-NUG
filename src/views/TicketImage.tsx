import React from "react";

import Diwali_2024 from "../statics/2024_MHU_Diwali.jpg";
import Diwali_2024_10$ from "../statics/2024_MHU_DIWALI_10$.jpg";
import Japan_ticket from "../statics/2024_MHU_Japan.jpg";

export const TicketImage: React.FC<{
  isMultiple: boolean;
  is10$ticket: boolean;
  isJapan: boolean;
  multiTicketNums: string;
  ticketNumber: string;
  name: string;
  printRef: React.MutableRefObject<any>;
  country: string;
  contact: string;
}> = ({
  isMultiple,
  isJapan,
  is10$ticket,
  multiTicketNums,
  ticketNumber,
  name,
  printRef,
  contact,
  country,
}) => {
  const onImageTicketNum = isMultiple ? multiTicketNums : ticketNumber;

  return (
    <div className="head-image" style={{ maxWidth: "768px" }} ref={printRef}>
      <p className="in-the-ticket-region">{onImageTicketNum}</p>
      <img
        src={
          is10$ticket ? (isJapan ? Japan_ticket : Diwali_2024_10$) : Diwali_2024
        }
        alt="Raffle"
        className="ticket"
      />
      <div className="text-on-image">
        <div className="text-on-image-innerwrapper">
          <p>{onImageTicketNum}</p>
          <p> {`${name}`}</p>
          <p className="country_on_img"> {`${country}`}</p>
          <p className="contact_on_img"> {`${contact}`}</p>
        </div>
      </div>
    </div>
  );
};
