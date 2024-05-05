import { useState } from "react";
import firebaseApp from "../../../src/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";

import styled from "@emotion/styled";
import { myname, myuid } from "../../../src/stores";
import { useRecoilState } from "recoil";

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

export default function LoginPage() {
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userid, setUserid] = useRecoilState(myuid);
  const [username, setUsername] = useRecoilState(myname);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClicktomovejoin = () => {
    router.push("/signjoin/join");
  };

  const signUp = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // user uid, 닉네임 recoil에 저장
        setUsername(user.displayName);
        setUserid(user.uid);

        console.log(userid);
        console.log(username);

        alert("로그인완료");
        router.push("/boards");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <Wapper>
      <Border>
        <Header>
          <h1>안녕하세요! 집사를 찾아주세요 입니다.</h1>

          <h2>집사를 찾아주세요를 이용하시려면 로그인이 필요합니다.</h2>
        </Header>
        <Body>
          <Input
            type="email"
            onChange={onChangeEmail}
            placeholder="Email"
          ></Input>

          <Input
            type="password"
            onChange={onChangePassword}
            placeholder="Password"
          ></Input>
        </Body>
        <Footer>
          <Button onClick={() => signUp({ email: email, password: password })}>
            Login
          </Button>

          <Button onClick={onClicktomovejoin}>Signup</Button>
        </Footer>
      </Border>
    </Wapper>
  );
}
