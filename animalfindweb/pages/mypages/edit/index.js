import { useState } from "react";
import firebaseApp from "../../../src/firebase";
import { getAuth, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";

export default function joinPage() {
    const auth = getAuth(firebaseApp);
    const router = useRouter()
    const [displayName, setDisplayName] = useState('');


      const onChangedisplayName = (event)=>{
        setDisplayName(event.target.value)
      }

   

        const EditUp = async () => {
            //닉네임
            await updateProfile(auth.currentUser, {
              displayName: displayName,
            }).then(() => {
              // Profile updated!
              // ...
            }).catch((error) => {
              // An error occurred
              // ...
            });

            alert("프로필이 수정되었습니다.")
            router.push("/mypages");

        }

    

  return (
    <div>
      <div>

      </div> 프로필 수정하기
      
      <input type="text" onChange={onChangedisplayName} placeholder="닉네임"></input>
    
      <button onClick={EditUp}>
        수정하기
      </button>
    </div>
  );
}