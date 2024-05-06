import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import { InnerButton, InnerLogo, InnerWrapper, Wrapper } from "./Header.styles";
import styled from "@emotion/styled";

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

export default function LayoutHeader() {
  const router = useRouter();

  const onClickLogo = () => {
    void router.push("/boards");
  };

  const onClickMove = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("로그아웃되셨습니다.");

        void router.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <InnerLogo onClick={onClickLogo}>집사를 찾아주세요!</InnerLogo>
        <div>
          <Button onClick={onClickMove}>로그아웃</Button>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
}
