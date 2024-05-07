import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore/lite";
import * as S from "../../styles/boardList.styles";
import { firebaseApp } from "../../src/firebase";
import Searchbars01 from "../../src/searchbars/01/Searchbars01";

export default function BoardsPage() {
  // 페이지 이동에 필요
  const router = useRouter();

  // 데이터 가져오기
  const [docData, setDocData] = useState([]);

  // 검색 데이터
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    //firebase의 데이터 베이스에서 가져오기
    async function fetchData() {
      try {
        const board = collection(getFirestore(firebaseApp), "board");
        const querySnapshot = await getDocs(
          query(board, orderBy("timestamp", "desc"))
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
    fetchData();
  }, []);

  //페이지 이동들
  const onClickMoveToBoardDetail = (event) => {
    router.push(`/boards/${event.target.id}`);
  };

  return (
    <S.Wrapper>
      <S.TableTop />
      <Searchbars01 setDocData={setDocData} setSearchResult={setSearchResult} />
      <S.TableTop />

      {docData?.map((el) => (
        <S.Row key={el._id}>
          <S.ImgBox>
            <S.Img src={el.fileUrl1} />
          </S.ImgBox>
          <S.textBox id={el._id} onClick={onClickMoveToBoardDetail}>
            <S.ColumnTitle id={el._id} onClick={onClickMoveToBoardDetail}>
              {el.title}
            </S.ColumnTitle>
          </S.textBox>
        </S.Row>
      ))}

      <S.TableBottom />
    </S.Wrapper>
  );
}
