import ChatList from "../../../src/chating/list";
import ChatWrite from "../../../src/chating/write";

import { useRouter } from "next/router";

import * as S from "../../../styles/boardsDetail";
import { firebaseApp } from "../../../src/firebase";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { myname, myuid } from "../../../src/stores";
import { useRecoilState } from "recoil";
import { getDatabase, ref, set } from "firebase/database";

export default function BoardDetailPage() {
  const router = useRouter();
  const [docData, setDocData] = useState("");
  const url = router.asPath.substring(8);

  const [userid, setUserid] = useRecoilState(myuid);
  const [username, setUsername] = useRecoilState(myname);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(getFirestore(firebaseApp), "chat", `${url}`);
        const docSnap = await getDoc(docRef);
        setDocData(docSnap.data());
      } catch (error) {
        console.error(error);
      }
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
