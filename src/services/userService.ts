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
