//import 기능
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { firebaseApp } from "../../src/firebase";
import {
  collection,
  getFirestore,
  doc,
  getDocs,
  query,
  orderBy,
  where,
  or,
} from "firebase/firestore/lite";
import { myname, myuid } from "../../src/stores";
import { useRecoilState } from "recoil";
import Searchbars02 from "../../src/searchbars/01/Searchbars02";

const Wapper = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
`;

const Board = styled.div`
  width: 1200px;
  margin: 100px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 4px solid black;
  border-radius: 6px;
  box-shadow: 1px 4px 0 rgb(0, 0, 0, 0.5);
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
`;
export const ColumnHeaderBasic = styled.div`
  width: 10%;
  text-align: center;
`;

export const ColumnHeaderTitle = styled.div`
  width: 100%;
  text-align: center;
`;

export const ColumnBasic = styled.div`
  width: 10%;
  text-align: center;
  :hover {
    color: blue;
  }
`;

export const ColumnTitle = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;

  :hover {
    color: blue;
  }
`;

export default function MyPagesPage() {
  const [userid, setUserid] = useRecoilState(myuid);

  const [username, setUsername] = useRecoilState(myname);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uid, setUid] = useState("");

  const [docData, setDocData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        setDisplayName(displayName || "");
        setEmail(email || "");
        setPhotoURL(photoURL || "images/avatar.png");
        setUid(uid || "");
      } else {
        // 유저가 로그아웃 상태일 때 초기화 또는 로직 추가
        setDisplayName("");
        setEmail("");
        setPhotoURL("");
        setUid("");
      }
    });

    return () => unsubscribe(); // cleanup 함수: 컴포넌트가 언마운트 될 때 구독 해제
  }, []); // 빈 배열을 전달하여 최초 렌더링 시에만 실행

  useEffect(() => {
    //firebase의 데이터 베이스에서 가져오기
    async function fetchData1() {
      try {
        const board = collection(getFirestore(firebaseApp), "chat");
        const querySnapshot = await getDocs(
          query(
            board,
            or(where("writer1", "==", userid), where("writer2", "==", userid))
          )
        );
        const newData = []; // 새로운 데이터 배열 생성

        querySnapshot.forEach((doc) => {
          newData.push(doc.data()); // 새로운 데이터를 배열에 추가
        });
        setDocData(newData); // 새로운 데이터로 상태 설정
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }
    console.log(docData);
    fetchData1();
  }, []);

  const onClickMoveToBoardDetail = (event) => {
    router.push(`/chat/${event.target.id}`);
  };

  return (
    <Wapper>
      <Board>
        <Searchbars02 />
        <Row>
          <ColumnHeaderTitle>채팅목록</ColumnHeaderTitle>
        </Row>
        {docData?.map((el) => (
          <Row key={el._id}>
            <ColumnTitle id={el._id} onClick={onClickMoveToBoardDetail}>
              {el.writer2}
            </ColumnTitle>
          </Row>
        ))}
      </Board>
    </Wapper>
  );
}
