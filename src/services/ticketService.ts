import {
  getDocs,
  doc,
  deleteDoc,
  query,
  collection,
  where,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { IDeletedTicketData, ITicketData } from "../models";
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
      return docSnap.data();
    }
  } catch (e) {
    console.error("Error Creating Ticket", e);
  }
};

export const removeTicket = async (
  ticketId: string,
  ticketGroup: "10$tickets" | "25$tickets"
) => {
  try {
    const ticketRef = doc(db, ticketGroup, ticketId);

    await deleteDoc(ticketRef);
  } catch (e) {
    console.error(e, "Error removing ticket");
  }
};

export const addToDeletedTickets = async (
  ticketData: IDeletedTicketData,
  ticketGroup: "10$tickets" | "25$tickets"
) => {
  try {
    if (!ticketData.ticketGroup || !ticketData.id) return;
    const docRef = await addDoc(collection(db, "deletedTickets"), ticketData);
    const docSnap = await getDoc(docRef);
    await removeTicket(ticketData.id, ticketGroup);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (e) {
    console.error("Error Deleting Ticket", e);
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

export const getSale = async (
  ticketGroup: "10$" | "25$",
  userId: string
): Promise<ITicketData[]> => {
  try {
    const dbGroup = ticketGroup === "10$" ? "10$tickets" : "25$tickets";
    const q = query(collection(db, dbGroup), where("creatorId", "==", userId));

    const querySnapshot = await getDocs(q);

    // Extract data from the querySnapshot
    const tickets: ITicketData[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as ITicketData; // Type casting to ITicketData
      return {
        ...data, // Spread the document data
        id: doc.id, // Add the document ID
      };
    });

    return tickets;
  } catch (e) {
    console.error("Error fetching sales:", e);
    return [];
  }
};

export const getAllSaleCount10$ = async () => {
  try {
    const q = query(collection(db, "10$tickets"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.reduce(
      (total, doc) => total + (doc.data().numberofTickets || 0),
      0
    );

    return data;
  } catch (e) {
    console.error("Error Fetching All Sales", e);
  }
};

export const getAllSaleCount25$ = async () => {
  try {
    const q = query(collection(db, "25$tickets"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.reduce(
      (total, doc) => total + (doc.data().numberofTickets || 0),
      0
    );
    return data;
  } catch (e) {
    console.error("Error Fetching All Sales", e);
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
