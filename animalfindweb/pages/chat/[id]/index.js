import ChatList from "../../../src/chating/list";
import ChatWrite from "../../../src/chating/write";

import { useRouter } from "next/router";

import * as S from "../../../styles/boardsDetail";
import { firebaseApp } from "../../../src/firebase";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";

import { Tooltip } from "antd";
import { getAuth } from "firebase/auth";

import { myname, myuid } from "../../../src/stores";
import { useRecoilState } from "recoil";

export default function BoardDetailPage() {
  const router = useRouter();
  const [docData, setDocData] = useState("");
  const url = router.asPath.substring(8);
  console.log(url);

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

  const onClickMoveToBoard = () => {
    router.push("/boards");
  };

  const onClickDelete = async () => {
    // 작성자만 삭제가능
    if (userid === url.substring(0, 28)) {
      const firestore = getFirestore(firebaseApp);
      const docRef = doc(firestore, "board", url);
      await deleteDoc(docRef);
      alert("게시글이 삭제되었습니다.");
      router.push("/boards"); // 삭제 후에 목록 페이지로 이동
    } else {
      alert("작성자만 삭제할수 있습니다.");
    }
  };

  return (
    <>
      <ChatList />
      <ChatWrite />
    </>
  );
}
