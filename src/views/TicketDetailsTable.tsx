import { ITicketData } from "../models";
import "../statics/_ticket-details.css";
import _ from "lodash";
export const TicketDetailsTable: React.FC<{
  searchVal: ITicketData[];
}> = ({ searchVal }) => {
  // return (
  //   <>
  //     <table>
  //       <tr>
  //         <th>Ticket Number</th>
  //         <th>Name</th>
  //         <th>Country</th>
  //         <th>Contact</th>
  //         <th>Agent Pin</th>
  //       </tr>
  //       {searchVal.map((val) => (
  //         <tr>
  //           <td>{val.ticketNumber}</td>
  //           <td>{val.name}</td>
  //           <td>{val.country}</td>
  //           <td>{val.contact}</td>
  //           <td>{val.creatorId}</td>
  //         </tr>
  //       ))}
  //     </table>
  //   </>
  // );

  return <></>;
};
