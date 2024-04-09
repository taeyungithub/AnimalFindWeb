import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import{collection,getFirestore,doc,getDocs, query, orderBy} from'firebase/firestore/lite'
import * as S from "../../styles/boardList.styles";
import { firebaseApp } from "../../src/firebase";
// import {getData} from "../../src/utils"
import Searchbars01 from "../../src/searchbars/01/Searchbars01";




export default function BoardsPage(){
    const router = useRouter();

// 데이터 가져오기
const [docData, setDocData] = useState([]);

// 검색 데이터
const [searchResult, setSearchResult] = useState([]);



useEffect(() => {
  async function fetchData() {
    try {
        const board = collection(getFirestore(firebaseApp), "board")
        const querySnapshot = await getDocs(query(board,orderBy("timestamp", "desc")));
        const newData = []; // 새로운 데이터 배열 생성


        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.data());
           newData.push(doc.data()); // 새로운 데이터를 배열에 추가
            // console.log(doc.createTime)
        });
        setDocData(newData); // 새로운 데이터로 상태 설정
        
    } catch (error) {
      console.error('Error fetching documents: ', error);
    }
  }
  console.log(docData)
  fetchData();
}, []);


    const onClickMoveToBoardNew = () => {
        router.push("/boards/new");
      };
    
      const onClickMoveToBoardDetail = (event) => 
      {
    //   { console.log(event.target)
        router.push(`/boards/${event.target.id}`);
      };

  



   return(
    <S.Wrapper>
      <Searchbars01 setDocData={setDocData} setSearchResult={setSearchResult}/>
      <S.TableTop>
      </S.TableTop>
      <S.Row>
        <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
        <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
        <S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>
        <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
      </S.Row>
      {docData?.map((el) => (
        <S.Row key={el._id}>
          <S.ColumnBasic>
            {String(el._id).slice(2,6).toUpperCase()}
          </S.ColumnBasic>
          <S.ColumnTitle id={el._id} onClick={onClickMoveToBoardDetail}>
            {el.title}
          </S.ColumnTitle>
          <S.ColumnBasic>{el.writer}</S.ColumnBasic>
          <S.ColumnBasic>{el.createdAt}</S.ColumnBasic>
           <img src={el.fileUrl1} />
        </S.Row>
      ))}
      <S.TableBottom />
      <S.Footer>
        {/* <S.Button onClick={onClickMoveToBoardNew}>
          <S.PencilIcon src="/images/write.png" />
          게시물 등록하기
        </S.Button> */}
      </S.Footer>
    </S.Wrapper>
   );
}