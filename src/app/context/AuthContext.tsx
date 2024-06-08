"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase/clientApp";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { DataStructureList, SortingAlgoList } from "@/lib/TopicLists";
const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const topics: { [key: string]: boolean } = {};
  SortingAlgoList.forEach((algo) => {
    topics[algo.link] = false;
  });
  DataStructureList.forEach((dataStructure) => {
    topics[dataStructure.link] = false;
  });
  const [progress, setProgress] = useState<any>(topics);
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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProgress(docSnap.data());
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            await setDoc(docRef, topics);
            console.log("Document written with ID: ", docRef.id);
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutUser,progress,setProgress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
