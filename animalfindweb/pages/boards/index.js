import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
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
  // useState함수 쓰는법: const [A,B] = useState(초깃값) -> A로사용하고 B로 값을 바꿈
  // 데이터 가져오기
  const [docData, setDocData] = useState([]);
  // 검색 데이터
  const [searchResult, setSearchResult] = useState([]);
  //useEffect함수 -> 페이지 띄우자마자 실행하게 하려고
  useEffect(() => {
    //firebase의 데이터 베이스에서 가져오기
    async function fetchData() {
      try {
        // board라는 이름의 문서를 firestore에서 가져오기
        const board = collection(getFirestore(firebaseApp), "board");
        // timestamp기준으로 내림차순
        const querySnapshot = await getDocs(
          query(board, orderBy("timestamp", "desc"))
        );
        const newData = []; // 새로운 데이터 배열 생성

        querySnapshot.forEach((doc) => {
          newData.push(doc.data()); // 새로운 데이터를 배열에 추가
        });
        setDocData(newData); // 새로운 데이터로 상태 설정
      } catch (error) {}
    }
    fetchData();
  }, []);

  // 페이지 이동
  const onClickMoveToBoardDetail = (event) => {
    //사진 클릭시 그 게시물의 상세페이지로 이동
    router.push(`/boards/${event.target.id}`);
  };

  // return안에는 html 넣음
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
