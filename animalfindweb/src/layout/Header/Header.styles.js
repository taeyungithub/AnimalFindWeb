import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 100px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const InnerWrapper = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
`;

export const InnerLogo = styled.div`
  font-size: 30px;
  font-weight: bold;
  font-family: "live";
  font-style: italic;
  color: skyblue;
  -webkit-text-stroke: 1px black;
  cursor: pointer;
`;

export const InnerButton = styled.span`
  margin: 10px;
  color: skyblue;
  cursor: pointer;
`;
