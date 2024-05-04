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

export default function BoardCommentList() {
  const router = useRouter();
  const [docData, setDocData] = useState([]);
  const [uid, setuid] = useState();
  const [uname, setuname] = useState();

  const url = router.asPath.substring(8);
  useEffect(() => {
    async function fetchData() {
      try {
        const board = collection(getFirestore(firebaseApp), `${url}comment`);
        const querySnapshot = await getDocs(
          query(board, orderBy("timestamp", "desc"))
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

  const onClickDelete = async (password) => {
    const inputPassword = prompt("비밀번호를 입력하세요.");

    if (inputPassword === password) {
      try {
        const firestore = getFirestore(firebaseApp);
        // 문서 제목을 비밀번호로 설정했으므로, doc 함수의 첫 번째 인자로 `${url}comment` 대신 password를 사용합니다.
        const docRef = doc(firestore, `${url}comment`, password);
        await deleteDoc(docRef);
        setDocData((prevDocData) =>
          prevDocData.filter((comment) => comment.password !== password)
        ); // 이 부분이 삭제된 댓글을 상태에서 필터링하여 제거하는 부분입니다.
        alert("댓글이 삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    } else {
      alert("댓글작성자가 아니거나 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div>
      {docData?.map((el) => (
        <S.ItemWrapper>
          <S.FlexWrapper>
            <S.Avatar src="/images/avatar.png" />
            <Otherprofile uid={el?.uid} />
            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer>{el?.writer}</S.Writer>
                <S.Star value={el.rating} disabled />
              </S.WriterWrapper>
              <S.Contents>{el?.contents}</S.Contents>
            </S.MainWrapper>
            <S.OptionWrapper>
              <S.UpdateIcon src="/images/option_update_icon.png/" />

              <S.DeleteIcon
                src="/images/option_delete_icon.png/"
                onClick={() => onClickDelete(el?.password)}
              />
            </S.OptionWrapper>
          </S.FlexWrapper>
          <S.DateString>{el?.createdAt}</S.DateString>
        </S.ItemWrapper>
      ))}
    </div>
  );
}
