import * as S from "../../styles/boardCommentList.styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  doc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  getDoc,
} from "firebase/firestore/lite";
import { firebaseApp } from "../firebase";
import Otherprofile from "../otherprofile";

export default function ChatList() {
  const router = useRouter();
  const [docData, setDocData] = useState([]);
  const [uid, setuid] = useState();
  const [uname, setuname] = useState();

  const url = router.asPath.substring(8);
  useEffect(() => {
    async function fetchData() {
      try {
        const board = collection(getFirestore(firebaseApp), `${url}chat`);
        const querySnapshot = await getDocs(
          query(board, orderBy("timestamp", "asc"))
        );
        const newData = []; // 새로운 데이터 배열 생성

        querySnapshot.forEach((doc) => {
          newData.push(doc.data()); // 새로운 데이터를 배열에 추가
          console.log(doc.data());
        });
        setDocData(newData); // 새로운 데이터로 상태 설정
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }
    fetchData();
  }, []);
  console.log(docData);

  return (
    <div>
      {docData?.map((el) => (
        <S.ItemWrapper>
          <S.FlexWrapper>
            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer>{el?.writer}</S.Writer>
              </S.WriterWrapper>
              <S.Contents>{el?.contents}</S.Contents>
            </S.MainWrapper>
          </S.FlexWrapper>
          <S.DateString>{el?.createdAt}</S.DateString>
        </S.ItemWrapper>
      ))}
    </div>
  );
}
