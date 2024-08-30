import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import db from "../../firebase";
import { getCollectionName } from "../../Constants";

const Fix = () => {
  useEffect(() => {
    getDocs(collection(db, getCollectionName()))
      .then((snapshot) => {
        snapshot.forEach(async (documentSnapshot) => {
          const data = documentSnapshot.data();
          if (!data.created_at || !data.updated_at) {
            const docRef = doc(db, getCollectionName(), documentSnapshot.id);
            await updateDoc(docRef, {
              created_at: data.created_at || serverTimestamp(),
              updated_at: data.updated_at || serverTimestamp(),
            });

            console.log(`Updated document with ID: ${documentSnapshot.id}`);
          }
        });
      })
      .catch((err) => {});
  }, []);
};

export default Fix;

