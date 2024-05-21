import ChatList from "../../../src/chating/list";
import ChatWrite from "../../../src/chating/write";
import { useRouter } from "next/router";
import { firebaseApp } from "../../../src/firebase";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore/lite";
import { useEffect } from "react";

export default function BoardDetailPage() {
  const router = useRouter();
  const url = router.asPath.substring(8);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(getFirestore(firebaseApp), "chat", `${url}`);
        const docSnap = await getDoc(docRef);
        setDocData(docSnap.data());
      } catch (error) {}
    }
    fetchData();
  }, [router]);

  return (
    <>
      <ChatList />
      <ChatWrite />
    </>
  );
}
