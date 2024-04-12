import { useState } from "react";
import firebaseApp from "../../../src/firebase";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

import styled from "@emotion/styled";
import { myname, myuid } from "../../../src/stores";
import {useRecoilState} from 'recoil'

const Wapper = styled.div`
  width: 100%; 
  height: 600px;
  
  display: flex;
  flex-direction: column; /* 아이템들을 세로 방향으로 정렬 */
  justify-content: center; /* 아이템들을 가운데 정렬 */
  align-items: center; /* 아이템들을 세로 방향으로 가운데 정렬 */

`;


export default function LoginPage() {
    const auth = getAuth(firebaseApp);
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    const [userid, setUserid] = useRecoilState(myuid)
    const [username, setUsername] = useRecoilState(myname)



    const onChangeEmail = (event)=>{
        setEmail(event.target.value)
      }

      const onChangePassword = (event)=>{
        setPassword(event.target.value)
      }

      const onClicktomovejoin= ()=>{
        router.push("/signjoin/join");
      }

    const signUp = async ({ email, password }) => {

      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // user uid, 닉네임 recoil에 저장
        setUsername(user.displayName)
        setUserid(user.uid)

        console.log(userid)
        console.log(username)

        alert("로그인완료")
        router.push("/boards");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

      

    }

  return (
    <Wapper>
      <div>
        <h5>안녕하세요! 집사를 찾아주세요 입니다.</h5>
      </div>
      <div>  
        <p>집사를 찾아주세요를 이용하시려면 로그인이 필요합니다.</p>
      </div>
      <div>
      <input type="email" onChange={onChangeEmail}></input>
      </div>
      <div>
      <input type="password" onChange={onChangePassword}></input>
      </div>
      <div>
      <button onClick={() => signUp({ email: email, password: password })}>
        로그인하기
      </button>
      </div>
      <div>
      <button onClick={onClicktomovejoin}>
        회원가입하기
      </button>
      </div>
    </Wapper>
  );
}