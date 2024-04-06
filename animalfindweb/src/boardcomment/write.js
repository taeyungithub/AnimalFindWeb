import { useRouter } from "next/router";
import * as S from "../../styles/boardCommentWrite.styles";
import { useState } from "react";
import { firebaseApp } from "../firebase";
import{collection, addDoc, getDocs, getFirestore, query} from'firebase/firestore/lite'
import { doc, setDoc } from "firebase/firestore/lite";


export default function BoardCommentWrite() {
    const router = useRouter();
    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [contents, setContents] = useState("");
    const [star, setStar] = useState(0)


    const url = router.asPath.substring(8);
  console.log(url)

    const onChangeWriter = (event) => {
      setWriter(event.target.value);
    };
  
    const onChangePassword = (event) => {
      setPassword(event.target.value);
    };
  
    const onChangeContents = (event) => {
      setContents(event.target.value);
    };
  
    const onClickWrite = async () => {
      try { 
         //현재 날짜
      const options = { timeZone: 'Asia/Seoul' };
      const currentDate = String(new Date().toLocaleDateString('ko-KR', options));

        

        await setDoc(doc(getFirestore(firebaseApp), `${url}comment`, `${password}`), {
          writer:writer,
          contents:contents,
          password:password,
          // _id: url,
          rating: 0,
          createdAt:currentDate,
          timestamp: new Date(),
          rating: star
          });

            router.push("/boards")
            router.push(`/boards/${url}`);
        
      } catch (error) {
        alert(error.message)
      }
    };
  
    return (
        <S.Wrapper>
          <>
            <span>댓글</span>
            <S.PencilIcon src="/images/pencil.png" />
          </>
          <S.InputWrapper>
            <S.Input
              placeholder="작성자"
              onChange={onChangeWriter}
            />
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
  