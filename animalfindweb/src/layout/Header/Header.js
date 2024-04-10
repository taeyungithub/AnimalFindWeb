import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import {
    InnerButton,
    InnerLogo,
    InnerWrapper,
    Wrapper,
  } from "./Header.styles";

export default function LayoutHeader(){
  const router = useRouter();

  const onClickLogo = ()=> {
    void router.push("/boards");
  };

  const onClickMove = ()=> {
    

const auth = getAuth();
  signOut(auth).then(() => {
  // Sign-out successful.
  alert("로그아웃되셨습니다.");

  void router.push("/");
  }).catch((error) => {
  // An error happened.
  });

    
  };



  return (
    <Wrapper>
      <InnerWrapper>
        <InnerLogo onClick={onClickLogo}>집사를 찾아주세요!</InnerLogo>
        <div>
          <InnerButton onClick={onClickMove}>로그아웃하기</InnerButton>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
