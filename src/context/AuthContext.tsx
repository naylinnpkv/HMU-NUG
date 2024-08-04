// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FBUser, signOut } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { auth, signInWithGoogle } from "../../firebase";
import { createUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

export type User = DocumentData;

interface AuthContextProps {
  currentUser: User | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (
        user &&
        user.displayName &&
        user.email &&
        user.displayName !== undefined &&
        user.email !== undefined
      ) {
        const userData = {
          userId: user.uid,
          name: user.displayName,
          email: user.email,
        };
        const loggedInUser = await createUser(userData);
        if (loggedInUser) setCurrentUser(loggedInUser);
      }
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ currentUser, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
