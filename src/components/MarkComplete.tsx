"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { Button } from "./ui/button";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/clientApp";
const MarkComplete = ({ topic }: { topic: string }) => {
  const { user, progress, setProgress } = UserAuth();
  let docRef: any;
  if (user) docRef = doc(db, "users", user.uid);

  const handleMarkClick = () => {
    if (progress) {
      setProgress({
        ...progress,
        [topic]: true,
      });
      if (user) {
        setDoc(
          docRef,
          {
            [topic]: true,
          },
          { merge: true }
        );
      }
    }
  };
  return (
    <div className="flex justify-center w-full">
      <Button
        onClick={handleMarkClick}
        variant="outline"
        className="text-md px-3"
      >
        {progress && progress[topic] ? "Completed" : "Mark as Complete"}
      </Button>
    </div>
  );
};

export default MarkComplete;
