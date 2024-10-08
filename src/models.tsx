import { DocumentData } from "firebase/firestore";

export interface ITicketData {
  id?: string;
  name: string;
  startingTicketNum: number;
  endingTicketNum: number;
  numberofTickets: number;
  contact: string;
  country: string;
  creatorId: string;
}

export interface IUserSalesData {
  userId: string;
  name: string;
  numberOfTicketsSold10$: number;
  numberOfTicketsSold25$: number;
}

export type IDeletedTicketData = ITicketData & {
  ticketGroup: "10$" | "25$";
};

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
