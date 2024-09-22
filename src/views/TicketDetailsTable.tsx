import { ITicketData } from "../models";
import "../statics/_ticket-details.css";
import _ from "lodash";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";

export const TicketDetailsTable: React.FC<{
  tickets: ITicketData[];
}> = ({ tickets }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [targetedTicket, setTargetedTicket] = useState<ITicketData | null>(
    null
  );

  const deleteHandler = (ticket: ITicketData) => {
    setTargetedTicket(ticket);
    setIsOpen(true);
    return;
  };

  const cancelHandler = () => {
    setTargetedTicket(null);
    setIsOpen(false);
  };

  const maxTextLength = 10; // Adjust as needed

  const truncateText = (text: string, length: number) => {
    return _.truncate(text, { length: length, omission: "..." });
  };

  return (
    <>
      <div
        style={{
          marginLeft: "20px",
          marginBottom: "50px",
          maxHeight: "490px",
          overflowY: "auto",
        }}
      >
        <table>
          <thead>
            <tr>
              <th style={{ width: "50px" }}>No</th>
              <th style={{ width: "150px" }}>Ticket Number</th>
              <th style={{ width: "100px" }}>Number of Tickets</th>
              <th style={{ width: "300px" }}>Name</th>
              <th style={{ width: "200px" }}>Country</th>
              <th>Contact</th>
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {tickets.length < 1 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No sales yet
                </td>
              </tr>
            ) : (
              tickets.map((ticket, index) => (
                <tr key={ticket.id}>
                  <td style={{ width: "50px" }}>{index + 1}</td>
                  <td
                    style={{ width: "150px" }}
                  >{`${ticket.startingTicketNum}-${ticket.endingTicketNum}`}</td>
                  <td style={{ width: "100px" }}>{ticket.numberofTickets}</td>
                  <td style={{ cursor: "pointer", width: "300px" }}>
                    {/* <Tooltip title={ticket.name}>
                    {truncateText(ticket.name, maxTextLength)}
                  </Tooltip> */}
                    {ticket.name}
                  </td>
                  <td style={{ width: "200px" }}>{ticket.country}</td>
                  <td style={{ cursor: "pointer" }}>
                    {/* <Tooltip title={ticket.contact}>
                    {truncateText(ticket.contact, maxTextLength)}
                  </Tooltip> */}
                    {ticket.contact}
                  </td>
                  {/* <td style={{ textAlign: "center" }}>
                  <Button
                    type="ghost"
                    onClick={() => deleteHandler(ticket)}
                    icon={<DeleteOutlined style={{ color: "red" }} />}
                  />
                </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Modal
        title={<DeleteOutlined style={{ color: "red" }} />}
        visible={isOpen}
        onOk={() => console.log("OK")}
        confirmLoading={false}
        onCancel={cancelHandler}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "20px", color: "blue" }}>
            Ticket Number {targetedTicket?.startingTicketNum} -
            {targetedTicket?.endingTicketNum} will be deleted
          </p>
          <p style={{ fontSize: "15px", color: "red" }}>
            * This action can't be undone
          </p>
        </div>
      </Modal>
    </>
  );
};
