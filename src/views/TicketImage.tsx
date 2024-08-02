import React from "react";
import Raffle from "../statics/2023_Deepavali_ticket.png";
import JapanRaffle from "../statics/2023_Japan.png";
import Chin_2024 from "../statics/2024_chin_ticket.jpg";
import Diwali_2024 from "../statics/2024_MHU_Diwali.jpg";

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
      <img src={Diwali_2024} alt="Raffle" className="ticket" />
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
