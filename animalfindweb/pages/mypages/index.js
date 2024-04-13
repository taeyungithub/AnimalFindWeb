//import 기능
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const Wapper = styled.div`
  width: 1200px;
  display: flex;
  justify-content: flex-start;
`
const Profile = styled.div`
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

export default function MyPagesPage() {
  
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uid, setUid] = useState("");

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
      console.log(user)

    });
    
    return () => unsubscribe(); // cleanup 함수: 컴포넌트가 언마운트 될 때 구독 해제
}, []); // 빈 배열을 전달하여 최초 렌더링 시에만 실행


  const onClicktomoveEdit=() =>{
    router.push("/mypage/edit");

  }

  return (
    <Wapper>
      <Profile>
            <Img src={photoURL} alt="프로필 사진" />
            <div>
                <Nickname >{displayName}</Nickname>
                <Email >{email}</Email>
            </div>
      </Profile>

      {/* <button onClick={onClicktomoveEdit}>수정하기</button> */}
    </Wapper>

  );
}
