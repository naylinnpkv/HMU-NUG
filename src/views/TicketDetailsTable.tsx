import { IDeletedTicketData, ITicketData } from "../models";
import "../statics/_ticket-details.css";
import _ from "lodash";
import { DeleteFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { addToDeletedTickets } from "../services/ticketService";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";

export const TicketDetailsTable: React.FC<{
  tickets: ITicketData[];
  ticketGroup: "10$" | "25$";
  isAdmin: boolean;
  setTickets: React.Dispatch<React.SetStateAction<ITicketData[]>>;
}> = ({ tickets, setTickets, ticketGroup, isAdmin }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [targetedTicket, setTargetedTicket] = useState<ITicketData | null>(
    null
  );

  const deleteModalHandler = (ticket: ITicketData) => {
    setTargetedTicket(ticket);
    setIsOpen(true);
    return;
  };

  const deleteHandler = async () => {
    if (!targetedTicket) return;
    try {
      const data: IDeletedTicketData = { ...targetedTicket, ticketGroup };
      await addToDeletedTickets(
        data,
        ticketGroup === "10$" ? "10$tickets" : "25$tickets"
      );
      setTickets((prev) =>
        prev.filter((ticket) => ticket.id === targetedTicket.id)
      );
    } catch (e) {
      console.log(e, "Error deleting the ticket");
    } finally {
      setIsOpen(false);
    }
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
              {/* {isAdmin && <th style={{ width: "75px" }}>Delete</th>} */}
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
                  {/* {isAdmin && (
                    <td style={{ textAlign: "center", width: "75px" }}>
                      <Button
                        type="text"
                        onClick={() => deleteModalHandler(ticket)}
                        icon={<DeleteFilled style={{ color: "red" }} />}
                      />
                    </td>
                  )} */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Modal
        title={<DeleteFilled style={{ color: "red" }} />}
        visible={isOpen}
        onOk={deleteHandler}
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
