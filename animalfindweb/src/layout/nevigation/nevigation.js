import { useRouter } from "next/router";
import { MenuItem, Wrapper } from "./nevigation.style";

const NAVIGATION_MENUS = [
  { name: "게시물등록", page: "/boards/new" },
  { name: "게시판", page: "/boards" },
  { name: "물어보기", page: "/chatbot" },
  { name: "채팅", page: "/chat" },
  { name: "마이페이지", page: "/mypages" },
];

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
