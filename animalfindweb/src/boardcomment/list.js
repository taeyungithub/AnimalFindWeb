import * as S from "../../styles/boardCommentList.styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firebaseApp } from "../firebase";
import Otherprofile from "../otherprofile";
import { getDatabase, ref, child, onValue, remove } from "firebase/database";
import { myname, myuid } from "../../src/stores";
import { useRecoilState } from "recoil";

export default function BoardCommentList() {
  const router = useRouter();
  const [docData, setDocData] = useState([]);
  const [userid, setUserid] = useRecoilState(myuid);
  const url = router.asPath.substring(8);

  useEffect(() => {
    try {
      const dbRef = ref(getDatabase(firebaseApp));
      const chatRef = child(dbRef, url);
      const unsubscribe = onValue(chatRef, (snapshot) => {
        if (snapshot.exists()) {
          setDocData(snapshot.val());
          // console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }, []);

  const onClickDelete = async (uid, key) => {
    if (userid === uid) {
      console.log(userid);
      console.log(uid);
      try {
        // Firebase Realtime Database에서 댓글 삭제
        const dbRef = ref(getDatabase(firebaseApp));
        // `url`은 댓글이 저장된 경로를 포함해야 합니다. 예) 'comments/commentId'
        const commentRef = child(dbRef, `${url}/${key}`);
        // 댓글 삭제
        await remove(commentRef);

        alert("댓글이 삭제되었습니다.");
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생: ", error);
      }
    } else {
      alert("댓글 작성자가 아닙니다.");
    }
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <>
      {Object.keys(docData).map((key) => {
        const message = docData[key];
        const createdAt = formatDate(message.createdAt);
        return (
          <div key={key}>
            <S.ItemWrapper>
              <S.FlexWrapper>
                <S.Avatar src="/images/avatar.png" />
                <S.MainWrapper>
                  <S.WriterWrapper>{message.writer}</S.WriterWrapper>
                  <S.Contents>{message.contents}</S.Contents>
                </S.MainWrapper>

                <S.OptionWrapper>
                  <Otherprofile uid={message.userid} />
                  <S.DeleteIcon
                    src="/images/option_update_icon.png/"
                    onClick={() => onClickDelete(message.userid, key)}
                  />
                </S.OptionWrapper>
              </S.FlexWrapper>
              <S.profile>
                <S.DateString>{createdAt}</S.DateString>
              </S.profile>
            </S.ItemWrapper>
          </div>
        );
      })}
    </>
  );
}
