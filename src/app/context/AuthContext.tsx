"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";
const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>("Abubakar");

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  },[user]);

  return (
    <AuthContext.Provider value={{ user,signInWithGoogle,signOutUser }}>{children}</AuthContext.Provider>
  );
};

export const userAuth = () => {
  return useContext(AuthContext);
};
