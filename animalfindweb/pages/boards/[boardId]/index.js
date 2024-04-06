import { useRouter } from "next/router";

import * as S from "../../../styles/boardsDetail";
import { firebaseApp} from "../../../src/firebase";
import{getFirestore,doc,getDoc, deleteDoc} from'firebase/firestore/lite'
import { useEffect, useState } from "react";

import BoardCommentList from "../../../src/boardcomment/list";
import BoardCommentWrite from "../../../src/boardcomment/write";

import { Tooltip } from "antd";

export default function BoardDetailPage() {
  const router = useRouter()
  const [docData, setDocData] = useState("");
  const url = router.asPath.substring(8);

  useEffect(()=>{
  async function fetchData(){
  console.log(url)

    try{
      const docRef = doc(getFirestore(firebaseApp), "board", `${url}`);
      const docSnap = await getDoc(docRef);
      setDocData(docSnap.data())
      // console.log(docSnap)

    }catch (error){
      console.error(error)
    }
  }
  fetchData();

  },[router])

  // console.log(docData.data())

  // const datata = docData.data()

// Create a reference to the cities collection
//   const docRef = collection(firebaseDb, "board");

// // Create a query against the collection.
//   const qqq = query(docRef, where("_id", "==", url));

//   console.log(qqq)


const onClickMoveToBoard = () => {
  router.push("/boards");
};


const onClickDelete = async () => {
  try {
    const firestore = getFirestore(firebaseApp);
    const docRef = doc(firestore, "board", url);
    await deleteDoc(docRef);
    alert("게시글이 삭제되었습니다.");
    router.push("/boards"); // 삭제 후에 목록 페이지로 이동
    // router.push("https://www.naver.com/"); // 삭제 후에 목록 페이지로 이동


  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

  return (
    <>
    <S.Wrapper>
      {docData && ( // docData가 존재하는 경우에만 렌더링합니다.
        <S.CardWrapper>
          <S.Header>
            <S.AvatarWrapper>
              <S.Avatar src="/images/avatar.png" />
              <S.Info>
                <S.Writer>{docData.writer}</S.Writer>
                <S.CreatedAt>
                  {docData.createdAt}
                </S.CreatedAt>
              </S.Info>
            </S.AvatarWrapper>

            <S.IconWrapper>
            <S.LinkIcon src="/images/link.png" />
            <Tooltip
              placement="topRight"
              title={`${docData.address ?? ""} ${
                docData.addressDetail ?? ""
              }`}
            >
              <S.LocationIcon src="/images/location.png" />
            </Tooltip>
          </S.IconWrapper>


          </S.Header>
          <S.Body>
            <S.Title >{docData.title}</S.Title>
          <S.ImageWrapper>
          {docData.fileUrl1 && <S.Image src={docData.fileUrl1} />}
          {docData.fileUrl2 && <S.Image src={docData.fileUrl2} />}
          {docData.fileUrl3 && <S.Image src={docData.fileUrl3} />}
            </S.ImageWrapper>
            <S.Contents>{docData.contents}</S.Contents>
          </S.Body>
        </S.CardWrapper>
      )}
      <S.BottomWrapper>
        <S.Button onClick={onClickMoveToBoard}>목록으로</S.Button>
        <S.Button onClick={onClickDelete}>삭제하기</S.Button>
      </S.BottomWrapper>
    </S.Wrapper>
    <BoardCommentWrite />
    <BoardCommentList />
  
    </>
  );
}
