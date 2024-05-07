import { useRouter } from "next/router";

import * as S from "../../../styles/boardsDetail";
import { firebaseApp } from "../../../src/firebase";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";

import BoardCommentList from "../../../src/boardcomment/list";
import BoardCommentWrite from "../../../src/boardcomment/write";

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
        const docRef = doc(getFirestore(firebaseApp), "board", `${url}`);
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
      <S.Wrapper>
        {docData && ( // docData가 존재하는 경우에만 렌더링합니다.
          <S.CardWrapper>
            <S.Header>
              <S.AvatarWrapper>
                <S.Avatar src="/images/avatar.png" />
                <S.Info>
                  <S.Writer>{docData.writer}</S.Writer>
                  <S.CreatedAt>{docData.createdAt}</S.CreatedAt>
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
              <S.Title>{docData.title}</S.Title>
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
