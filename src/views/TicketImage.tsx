import React from "react";
import Raffle from "../statics/2023_Deepavali_ticket.png";
import JapanRaffle from "../statics/2023_Japan.png";
export const TicketImage: React.FC<{
  isMultiple: boolean;
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
        src={isJapan ? JapanRaffle : Raffle}
        alt="Raffle"
        className="ticket"
      />
      <div className="text-on-image">
        <div className="text-on-image-innerwrapper">
          <p style={{ marginTop: "19.5px" }}>{onImageTicketNum}</p>
          <p> {`${name}`}</p>
          <p> {`${country}`}</p>
          <p> {`${contact}`}</p>
        </div>
      </div>
    </div>
  );
};
