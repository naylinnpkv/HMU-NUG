import React from "react";
import Raffle from "../statics/chin_raffle.jpg";
export const TicketImage: React.FC<{
  isMultiple: boolean;
  multiTicketNums: string;
  ticketNumber: string;
  name: string;
  printRef: React.MutableRefObject<any>;
  country: string;
  contact: string;
}> = ({
  isMultiple,
  multiTicketNums,
  ticketNumber,
  name,
  printRef,
  contact,
  country,
}) => {
  const onImageTicketNum = isMultiple
    ? "Temp:" + multiTicketNums
    : "Temp:" + ticketNumber;

  return (
    <div className="head-image" style={{ maxWidth: "768px" }} ref={printRef}>
      <p className="in-the-ticket-region">{onImageTicketNum}</p>
      <img src={Raffle} alt="Raffle" className="ticket" />
      <div className="text-on-image">
        <div className="text-on-image-innerwrapper">
          <p style={{ marginTop: "5px" }}>{onImageTicketNum}</p>
          <p> {`${name}`}</p>
          <p> {`${country}`}</p>
          <p> {`${contact}`}</p>
        </div>
      </div>
    </div>
  );
};
