import { useRouter } from "next/router";
import * as S from "../../styles/boardCommentWrite.styles";
import { useState } from "react";
import { firebaseApp } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { myname, myuid } from "../stores";
import { useRecoilState } from "recoil";
import { getDatabase, ref, set, child, push } from "firebase/database";
import styled from "@emotion/styled";

const Wapper = styled.div`
  width: 100%;
  height: 500px;

  display: flex;
  flex-direction: column; /* 아이템들을 세로 방향으로 정렬 */
  justify-content: center; /* 아이템들을 가운데 정렬 */
  align-items: center; /* 아이템들을 세로 방향으로 가운데 정렬 */
`;

const Border = styled.div`
  width: 1000px;
  height: 200px;
  padding: 10px;
  border: 4px solid black;
  border-radius: 6px;
  box-shadow: 1px 4px 0 rgb(0, 0, 0, 0.5);
  overflow: auto; /* 내용이 넘치는 경우 스크롤 표시 */

  display: flex;
  flex-direction: column; /* 아이템들을 세로 방향으로 정렬 */
  margin-bottom: 40px;
`;

export default function ChatWrite() {
  const [userid, setUserid] = useRecoilState(myuid);
  const [username, setUsername] = useRecoilState(myname);

  const router = useRouter();
  const [writer, setWriter] = useState(username);
  const [contents, setContents] = useState("");

  const url = router.asPath.substring(8);

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  const onClickWrite = async () => {
    const db = getDatabase(firebaseApp);
    const chatRef = child(ref(db), url);
    await push(chatRef, {
      writer: writer,
      contents: contents,
    });
    setContents(""); // 메시지 보낸 후 입력창 초기화
  };

  return (
    <Wapper>
      <Border>
        <S.Contents
          value={contents}
          maxLength={100}
          onChange={onChangeContents}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
        <S.BottomWrapper>
          <S.ContentsLength>{contents.length}/100</S.ContentsLength>
          <S.Button onClick={onClickWrite}>전송하기</S.Button>
        </S.BottomWrapper>
      </Border>
    </Wapper>
  );
}
