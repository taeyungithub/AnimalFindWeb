import { useRouter } from "next/router";
import * as S from "../../styles/boardCommentWrite.styles";
import { useState } from "react";
import { firebaseApp } from "../firebase";
import { myname, myuid } from "../stores";
import { useRecoilState } from "recoil";
import { getDatabase, ref, child, push } from "firebase/database";

export default function BoardCommentWrite() {
  const [userid, setUserid] = useRecoilState(myuid);
  const [username, setUsername] = useRecoilState(myname);
  const [writer, setWriter] = useState(username);
  const [contents, setContents] = useState("");

  const router = useRouter();
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
      userid: userid,
      createdAt: Date.now(),
    });
    setContents(""); // 메시지 보낸 후 입력창 초기화
  };

  return (
    <S.Wrapper>
      <>
        <span>댓글</span>
        <S.PencilIcon src="/images/pencil.png" />
      </>
      <S.InputWrapper>
        <S.Input value={username} readOnly />
      </S.InputWrapper>
      <S.ContentsWrapper>
        <S.Contents
          value={contents}
          maxLength={100}
          onChange={onChangeContents}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
        <S.BottomWrapper>
          <S.ContentsLength>{contents.length}/100</S.ContentsLength>
          <S.Button onClick={onClickWrite}>등록하기</S.Button>
        </S.BottomWrapper>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
}
