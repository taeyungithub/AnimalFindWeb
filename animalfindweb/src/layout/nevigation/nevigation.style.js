import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 64px;
  background-color: skyblue;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 19px;
  color: black;
`;

export const MenuItem = styled.div`
  margin: 0px 60px;
  cursor: pointer;
  -webkit-text-stroke: 1px black;
  :hover {
    color: white;
    position: relative;
    bottom: 2px;
  }
`;
