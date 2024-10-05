import {
  getDocs,
  getDoc,
  query,
  collection,
  where,
  addDoc,
  limit,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { IUserSalesData } from "../models";

export const createUser = async (userData: {
  userId: string;
  name: string;
  email: string;
}) => {
  if (auth.currentUser) {
    try {
      // Check if user with this userId already exists
      const q = query(
        collection(db, "users"),
        where("email", "==", userData.email),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // User does not exist, add new user with auto-generated ID
        const docRef = await addDoc(collection(db, "users"), userData);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data();
        }
      } else {
        // User already exists
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();
        return data;
      }
    } catch (e) {
      console.error("Error checking or adding user: ", e);
    }
  } else {
    console.error("No authenticated user");
  }
};

export const getUserTicketSales = async (): Promise<IUserSalesData[]> => {
  try {
    // Fetch all users
    const usersQuery = query(collection(db, "users"));
    const usersSnapshot = await getDocs(usersQuery);

    const userSalesData: IUserSalesData[] = [];

    // Loop through each user to count their ticket sales
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data() as { userId: string; name: string };

      // Fetch 10$ tickets created by this user
      const ticketsQuery10$ = query(
        collection(db, "10$tickets"),
        where("creatorId", "==", userData.userId)
      );
      const ticketsSnapshot10$ = await getDocs(ticketsQuery10$);
      const numberOfTicketsSold10$ = ticketsSnapshot10$.docs.reduce(
        (total, doc) => total + (doc.data().numberofTickets || 0),
        0
      );

      // Fetch 25$ tickets created by this user
      const ticketsQuery25$ = query(
        collection(db, "25$tickets"),
        where("creatorId", "==", userData.userId)
      );
      const ticketsSnapshot25$ = await getDocs(ticketsQuery25$);
      const numberOfTicketsSold25$ = ticketsSnapshot25$.docs.reduce(
        (total, doc) => total + (doc.data().numberofTickets || 0),
        0
      );

      // Step 5: Push the result to the userSalesData array
      if (
        userData.name !== "Nay Linn" &&
        userData.name !== "Kathir Pkv" &&
        userData.name !== "HMU NUG"
      ) {
        userSalesData.push({
          userId: userData.userId,
          name: userData.name,
          numberOfTicketsSold10$,
          numberOfTicketsSold25$,
        });
      }
    }

    return userSalesData;
  } catch (e) {
    console.error("Error fetching user ticket sales:", e);
    return [];
  }
};
