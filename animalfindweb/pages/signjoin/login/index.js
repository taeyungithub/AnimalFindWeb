import { useState } from "react";
import firebaseApp from "../../../src/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";



export default function LoginPage() {
    const auth = getAuth(firebaseApp);
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    const onChangeEmail = (event)=>{
        setEmail(event.target.value)
      }

      const onChangePassword = (event)=>{
        setPassword(event.target.value)
      }

      const onClicktomovejoin= ()=>{
        router.push("/signjoin/join");
      }

    const signUp = ({ email, password }) => {

      try {
        signInWithEmailAndPassword(auth, email, password);

        alert("로그인 완료");

        router.push("/boards");

      } catch (error) {
        console.log(error)
      }
    
    }

  return (
    <main>
      <div>
        <h5>안녕하세요! 집사를 찾아주세요 입니다.</h5>
        <p>집사를 찾아주세요를 이용하시려면 로그인이 필요합니다.</p>
      </div>
      <input type="email" onChange={onChangeEmail}></input>
      <input type="password" onChange={onChangePassword}></input>

      <button onClick={() => signUp({ email: email, password: password })}>
        로그인하기
      </button>
      <button onClick={onClicktomovejoin}>
        회원가입하기
      </button>
    </main>
  );
}