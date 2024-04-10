import { useState } from "react";
import firebaseApp from "../../../src/firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/router";



export default function joinPage() {
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

    const joinUp = ({ email, password }) => {

      try {
        createUserWithEmailAndPassword(auth, email, password);

        alert("회원가입 완료");
        router.push("/boards");
      } catch (error) {
        console.log(error)
      }
    
    }

  return (
    <main>
      <div>

      </div> 회원가입
      <input type="text" onChange={onChangeEmail}></input>
      <input type="password" onChange={onChangePassword}></input>

      <button onClick={() => joinUp({ email: email, password: password })}>
        회원가입하기
      </button>
    </main>
  );
}