import { useState } from "react";
import firebaseApp from "../../../src/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { doc, getFirestore, setDoc } from "firebase/firestore/lite";
import Checkbox1 from "../../../src/checkbox1";

const Wapper = styled.div`
  width: 100%;
  height: 500px;

  display: flex;
  flex-direction: column; /* 아이템들을 세로 방향으로 정렬 */
  justify-content: center; /* 아이템들을 가운데 정렬 */
  align-items: center; /* 아이템들을 세로 방향으로 가운데 정렬 */
`;

const Border = styled.div`
  width: 800px;
  height: 400px;
  padding: 40px;
  border: 4px solid black;
  border-radius: 6px;
  box-shadow: 1px 4px 0 rgb(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column; /* 아이템들을 세로 방향으로 정렬 */
  justify-content: center; /* 아이템들을 가운데 정렬 */
  align-items: center; /* 아이템들을 세로 방향으로 가운데 정렬 */
`;

const Header = styled.div`
  width: 650px;
  height: 100px;
  margin-bottom: 15px;

  display: flex;
  flex-direction: column; /* 아이템들을 세로 방향으로 정렬 */
  justify-content: center; /* 아이템들을 가운데 정렬 */
  align-items: center; /* 아이템들을 세로 방향으로 가운데 정렬 */
`;

const Body = styled.div`
  width: 400px;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 10px;
  margin-bottom: 16px;
  border-radius: 6px;
  background-color: #f8f8f8;
`;

const Footer = styled.div`
  width: 400px;

  display: flex;
  flex-direction: row; /* 아이템들을 세로 방향으로 정렬 */
  justify-content: space-around; /* 아이템들을 가운데 정렬 */
`;

const Button = styled.button`
  width: 100px;
  height: 48px;
  padding: 0 10px;
  border-radius: 6px;
  background-color: skyblue;
  box-shadow: 1px 4px 0 rgb(0, 0, 0, 0.5);
  cursor: pointer;
  :hover {
    background-color: #2193b0;
  }
  :active {
    color: white;
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    top: 2px;
  }
`;

const Check = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;
const Agree = styled.span`
  margin-left: 25px;
  margin-right: 10px;
`;

export default function joinPage() {
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [agree, setAgree] = useState(false);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangedisplayName = (event) => {
    setDisplayName(event.target.value);
  };
  const onCheckAgree = (event) => {
    setAgree(event.target.checked);
  };

  const joinUp = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        setDoc(doc(getFirestore(firebaseApp), "user", `${user.uid}`), {
          displayName: displayName,
          uid: user.uid,
          contents: "",
        });

        alert("회원가입이 완료되었습니다!");
        router.push("/");
      })
      .catch((error) => {
        alert("다시 입력해주세요!");
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    //닉네임
    updateProfile(auth.currentUser, {
      displayName: displayName,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  const onClickBack = () => {
    router.push("/");
  };

  return (
    <Wapper>
      <Border>
        <Header>
          <h1>Signup</h1>
        </Header>
        <Body>
          <Input
            type="text"
            onChange={onChangeEmail}
            placeholder="ID : Email를 입력해주세요"
          ></Input>
          <Input
            type="password"
            onChange={onChangePassword}
            placeholder="Password : 8자이상 입력해주세요"
          ></Input>
          <Input
            type="text"
            onChange={onChangedisplayName}
            placeholder="닉네임"
          ></Input>
          <Check>
            <Checkbox1></Checkbox1>
            <div>
              <Agree>동의하십니까?</Agree>
              <input type="checkbox" onChange={onCheckAgree}></input>
            </div>
          </Check>
        </Body>
        <Footer>
          <Button onClick={onClickBack}>뒤로가기</Button>
          <Button
            onClick={() => joinUp({ email: email, password: password })}
            disabled={!agree}
          >
            Signup
          </Button>
        </Footer>
      </Border>
    </Wapper>
  );
}
