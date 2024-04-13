import { useState } from "react";
import firebaseApp from "../../../src/firebase";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { doc, getFirestore, setDoc } from "firebase/firestore/lite";


const Wapper = styled.div`
  width: 100%; 
  height: 600px;
  
  display: flex;
  flex-direction: column; /* 아이템들을 세로 방향으로 정렬 */
  justify-content: center; /* 아이템들을 가운데 정렬 */
  align-items: center; /* 아이템들을 세로 방향으로 가운데 정렬 */

`;



export default function joinPage() {
    const auth = getAuth(firebaseApp);
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');


    const onChangeEmail = (event)=>{
        setEmail(event.target.value)
      }

      const onChangePassword = (event)=>{
        setPassword(event.target.value)
      }

      const onChangedisplayName = (event)=>{
        setDisplayName(event.target.value)
      }

    const joinUp = async ({ email, password }) => {

      await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...

     setDoc(doc(getFirestore(firebaseApp), "user", `${user.uid}`), {
      displayName:displayName,
      uid:user.uid
     });



    alert("회원가입이 완료되었습니다.")
    router.push("/");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    

  //닉네임
  updateProfile(auth.currentUser, {
    displayName: displayName
  }).then(() => {
    // Profile updated!
    // ...
  }).catch((error) => {
    // An error occurred
    // ...
  });



    }

  return (
    <Wapper>
      <div>

      </div> 회원가입
      <input type="text" onChange={onChangeEmail}></input>
      <input type="password" onChange={onChangePassword}></input>
      <input type="text" onChange={onChangedisplayName} placeholder="닉네임"></input>


      <button onClick={() => joinUp({ email: email, password: password })}>
        회원가입하기
      </button>
    </Wapper>
  );
}