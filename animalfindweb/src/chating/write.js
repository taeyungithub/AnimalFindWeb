import { useRouter } from "next/router";
import * as S from "../../styles/boardCommentWrite.styles";
import { useState } from "react";
import { firebaseApp } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { myname, myuid } from "../stores";
import { useRecoilState } from "recoil";

export default function ChatWrite() {
  const [userid, setUserid] = useRecoilState(myuid);
  const [username, setUsername] = useRecoilState(myname);

  const router = useRouter();
  const [writer, setWriter] = useState(username);
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [star, setStar] = useState(0);

  const url = router.asPath.substring(8);

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  const onClickWrite = async () => {
    try {
      //현재 날짜
      const options = { timeZone: "Asia/Seoul" };
      const currentDate = String(
        new Date().toLocaleDateString("ko-KR", options)
      );

      await setDoc(
        doc(getFirestore(firebaseApp), `${url}chat`, `${password}`),
        {
          writer: writer,
          contents: contents,
          password: password,
          rating: 0,
          createdAt: currentDate,
          timestamp: new Date(),
          rating: star,
          uid: userid,
        }
      );

      router.push("/chat");
      router.push("/chat");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <S.Wrapper>
      <>
        <span>댓글</span>
        <S.PencilIcon src="/images/pencil.png" />
      </>
      <S.InputWrapper>
        <S.Input value={username} readOnly />
        <S.Input
          type="password"
          placeholder="비밀번호"
          onChange={onChangePassword}
        />
        <S.Star onChange={setStar} />
      </S.InputWrapper>
      <S.ContentsWrapper>
        <S.Contents
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
