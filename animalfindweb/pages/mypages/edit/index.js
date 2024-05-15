import { useState } from "react";
import firebaseApp from "../../../src/firebase";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore/lite";
import { myname, myuid } from "../../../src/stores";
import { useRecoilState } from "recoil";

export const Wrapper = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Border = styled.div`
  margin-top: 40px;
  width: 800px;
  height: 300px;
  padding: 40px;
  border: 4px solid black;
  border-radius: 6px;
  box-shadow: 1px 4px 0 rgb(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column; /* 아이템들을 세로 방향으로 정렬 */
  align-items: center; /* 아이템들을 세로 방향으로 가운데 정렬 */
`;
const Input = styled.textarea`
  margin-top: 40px;
  width: 100%;
  height: 100px;
  padding: 0 10px;
  margin-bottom: 16px;
  border-radius: 6px;
  background-color: #f8f8f8;
`;
const Button = styled.button`
  width: 100px;
  height: 48px;
  padding: 0 10px;
  border-radius: 6px;
  background-color: white;
  box-shadow: 1px 4px 0 rgb(0, 0, 0, 0.5);
  cursor: pointer;
  :hover {
    background-color: lightgray;
  }
  :active {
    color: white;
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    top: 2px;
  }
`;
export default function joinPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [userid, setUserid] = useRecoilState(myuid);
  const onChangedisplayName = (event) => {
    setDisplayName(event.target.value);
  };

  const EditUp = async () => {
    //내 소개
    const db = getFirestore(firebaseApp);

    await updateDoc(doc(db, "user", userid), {
      contents: displayName,
    });

    alert("프로필이 수정되었습니다.");
    router.push("/mypages");
  };

  return (
    <Wrapper>
      <Border>
        <h2>내 소개 수정하기</h2>
        <Input
          type="text"
          onChange={onChangedisplayName}
          placeholder="내 소개를 입력해주세요"
        ></Input>
        <Button onClick={EditUp}>수정하기</Button>
      </Border>
    </Wrapper>
  );
}
