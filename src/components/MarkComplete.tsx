'use client';
import { UserAuth } from '@/app/context/AuthContext'
import { Button } from './ui/button'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/lib/firebase/clientApp';
const MarkComplete = ({topic}:{topic:string}) => {
    const { user, progress,setProgress } = UserAuth()
    let docRef:any;
    if (user)
        docRef = doc(db, "users", user.uid);

    const hancleMarkClick = ()  => {
        if(progress){
            setProgress({
                ...progress,
                [topic]:true
            })
            setDoc(docRef, {
                [topic]:true
            }, { merge: true });
        }
    }
  return (
    <Button onClick={hancleMarkClick}>
        {progress && progress[topic] ? 'Completed' : 'Mark as Complete'}
    </Button>
  )
}

export default MarkComplete