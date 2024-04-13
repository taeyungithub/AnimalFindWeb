//import 기능
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { firebaseApp } from "../../src/firebase";
import{collection,getFirestore,doc,getDocs, query, orderBy, where} from'firebase/firestore/lite'
import { myname, myuid } from "../../src/stores";
import {useRecoilState} from 'recoil'



const Wapper = styled.div`
  width: 1800px;
  display: flex;
  justify-content: flex-start;
`
const Profile = styled.div`
width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`

const Img = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
`
const Nickname =styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`

const Email =styled.div`
  font-size: 16px;
  color: gray;
`

const Board = styled.div`
  width: 1200px;
  margin: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

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
  width: 70%;
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
  width: 70%;
  text-align: center;
  cursor: pointer;

  :hover {
    color: blue;
  }
`;

export default function MyPagesPage() {
  const [username, setUsername] = useRecoilState(myname)


  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uid, setUid] = useState("");

  const [docData, setDocData] = useState([]);



  const router = useRouter()

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
  async function fetchData() {
  try {
        const board = collection(getFirestore(firebaseApp), "board")
        const querySnapshot = await getDocs(query(board,
          where("writer", "==", username)
          ));
        const newData = []; // 새로운 데이터 배열 생성


        querySnapshot.forEach((doc) => {
          newData.push(doc.data()); // 새로운 데이터를 배열에 추가
        });
        setDocData(newData); // 새로운 데이터로 상태 설정
        
        } catch (error) {
          console.error('Error fetching documents: ', error);
        }
      }
      console.log(docData)
      fetchData();
    }, []);

    const onClicktomoveEdit= ()=>{}



const onClickMoveToBoardDetail = (event) => {
  router.push(`/boards/${event.target.id}`);
};

  return (
    <Wapper>

      <Profile>
            <Img src={photoURL} alt="프로필 사진" />
            <div>
                <Nickname >{displayName}</Nickname>
                <Email >{email}</Email>
            </div>

      </Profile>
      
      <Board>
      <div>작성한 게시물</div>

      <Row>
              <ColumnHeaderBasic>ID</ColumnHeaderBasic>
              <ColumnHeaderTitle>제목</ColumnHeaderTitle>
              <ColumnHeaderBasic>작성자</ColumnHeaderBasic>
              <ColumnHeaderBasic>날짜</ColumnHeaderBasic>
      </Row>
            {docData?.map((el) => (
              <Row key={el._id}>
                <ColumnBasic>
                  {String(el._id).slice(31,35).toUpperCase()}
                </ColumnBasic>
                <ColumnTitle id={el._id} onClick={onClickMoveToBoardDetail}>
                  {el.title}
                </ColumnTitle>
                <ColumnBasic>{el.writer}</ColumnBasic>
                <ColumnBasic>{el.createdAt}</ColumnBasic>
              </Row>
            ))}
            
          </Board>
          
    </Wapper>

  );
}
