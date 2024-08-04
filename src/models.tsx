import { DocumentData } from "firebase/firestore";

export interface ITicketData {
  name: string;
  startingTicketNum: number;
  endingTicketNum: number;
  numberofTickets: number;
  contact: string;
  country: string;
  creatorId: string;
}

export interface ICountrySales {
  country: string;
  sales: number;
}

// Define a type guard for ITicketData
export const isITicketData = (data: DocumentData): data is ITicketData => {
  return (
    typeof data.name === "string" &&
    typeof data.ticketNumber === "number" &&
    typeof data.contact === "string" &&
    typeof data.country === "string" &&
    typeof data.creatorId === "string"
  );
};
