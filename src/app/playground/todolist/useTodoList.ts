import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "@/lib/firebase";

const useTodoList = () => {
  const [value, loading, error] = useCollection(collection(db, "test"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const addTodoList = (text: string) => {
    const testRef = collection(db, "test");

    return addDoc(testRef, {
      created: serverTimestamp(),
      text: text,
      isCompleted: false,
    });
  };

  console.log(db);

  return {
    value,
    loading,
    error,
    addTodoList,
  };
};

export default useTodoList;
