import LayoutHeader from "./Header/Header";
import LayoutNavigation from "./nevigation/nevigation";
import styled from "@emotion/styled";

const Body = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default function Layout(props){
  return (
    <>
      <LayoutHeader />
      <LayoutNavigation />
      <Body>{props.children}</Body>
    </>
  );
}
