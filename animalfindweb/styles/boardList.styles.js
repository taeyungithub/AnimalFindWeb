import styled from "@emotion/styled";

export const TableTop = styled.div`
  border-top: 2px solid gray;
  margin-top: 20px;
`;

export const TableBottom = styled.div`
  border-bottom: 2px solid gray;
`;

export const Wrapper = styled.div`
  width: 1200px;
  margin-top: 20px;
  margin-left: 100px;
  margin-right: 100px;
  padding: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const Row = styled.div`
  margin-top: 20px;
  width: calc(25% - 7px);
  aspect-ratio: 6 / 5;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 15px;

  &:after {
    content: "";
    display: block;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    opacity: 0;
    transition: all 0.4s ease-in-out;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover Img {
    transform: scale(1.1);
    filter: blur(3px);
  }

  &:hover div {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const ImgBox = styled.div`
  width: 100%;
  height: 100%;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease-in-out, filter 0.4s ease-in-out;
`;

export const textBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 20px;
  z-index: 3;
`;

export const ColumnTitle = styled.div`
  color: white;
  margin: 5px 0 0;
  font-size: 23px;
  font-weight: 700;
  transform: translateY(70px);

  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 50px;
`;
