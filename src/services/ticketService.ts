import {
  getDocs,
  query,
  collection,
  where,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ITicketData } from "../models";
import _ from "lodash";

export const createTicket = async (
  ticketData: ITicketData,
  ticketGroup: "25$" | "10$"
) => {
  const dbGroup = ticketGroup === "10$" ? "10$tickets" : "25$tickets";

  try {
    if (!ticketData.creatorId) return;
    const docRef = await addDoc(collection(db, dbGroup), ticketData);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("IN THE FUNCTION", docSnap.data());
      return docSnap.data();
    }
  } catch (e) {
    console.error("Error Creating Ticket", e);
  }
};

export const countTickets = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "tickets"));
    const count = querySnapshot.size;
    return count;
  } catch (e) {
    console.error("Error Getting the Next Tiket Number", e);
  }
};

export const getLastEndingTicketNum = async (
  ticketGroup: "25$" | "10$"
): Promise<number | null> => {
  try {
    const dbGroup = ticketGroup === "10$" ? "10$tickets" : "25$tickets";
    const querySnapshot = await getDocs(collection(db, dbGroup));

    let maxEndingTicketNum: number = ticketGroup === "25$" ? 600 : 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.endingTicketNum !== undefined && data.endingTicketNum !== null) {
        const endingTicketNum = _.toNumber(data.endingTicketNum);
        if (!isNaN(endingTicketNum)) {
          if (
            maxEndingTicketNum === null ||
            endingTicketNum > maxEndingTicketNum
          ) {
            maxEndingTicketNum = endingTicketNum;
          }
        }
      }
    });

    return maxEndingTicketNum === 600
      ? maxEndingTicketNum
      : maxEndingTicketNum + 1;
  } catch (e) {
    console.error("Error getting the last ending ticket number", e);
    return null;
  }
};
