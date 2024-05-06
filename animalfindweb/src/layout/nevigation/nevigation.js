import { useRouter } from "next/router";
import { MenuItem, Wrapper } from "./nevigation.style";
import styled from "@emotion/styled";

const NAVIGATION_MENUS = [
  { name: "게시물등록", page: "/boards/new" },
  { name: "게시판", page: "/boards" },
  { name: "물어보기", page: "/chatbot" },
  { name: "채팅", page: "/chat" },
  { name: "마이페이지", page: "/mypages" },
];

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

export default function LayoutNavigation() {
  const router = useRouter();

  const onClickMenu = (event) => {
    void router.push(event.currentTarget.id);
  };

  return (
    <Wrapper>
      {NAVIGATION_MENUS.map((el) => (
        <div key={el.page}>
          <MenuItem id={el.page} onClick={onClickMenu}>
            {el.name}
          </MenuItem>
        </div>
      ))}
    </Wrapper>
  );
}
