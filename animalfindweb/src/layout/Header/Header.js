import { useRouter } from "next/router";
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

  const onClickMoveToLogin = ()=> {
    void router.push("/login");
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <InnerLogo onClick={onClickLogo}>집사를 찾아주세요!</InnerLogo>
        <div>
          <InnerButton onClick={onClickMoveToLogin}>로그인</InnerButton>
          <InnerButton>회원가입</InnerButton>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
