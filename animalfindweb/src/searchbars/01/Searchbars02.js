import { useState } from "react";
import {
  FireFilledIcon,
  Searchbar,
  SearchbarInput,
  SearchbarInput2,
} from "../../../styles/Searchbars01.styles";
import _ from "lodash";
import {
  collection,
  doc,
  endAt,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  startAt,
  where,
} from "firebase/firestore/lite";
import { firebaseApp } from "../../firebase";

import { myname, myuid } from "../../stores";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Button = styled.button`
  width: 100px;
  height: 48px;
  padding: 0 10px;
  border-radius: 6px;
  background-color: white;
  box-shadow: 1px 4px 0 rgb(0, 0, 0, 0.5);
  cursor: pointer;
  :hover {
    background-color: gray;
  }
  :active {
    color: white;
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    top: 2px;
    background-color: gray;
  }
`;

export default function Searchbars01(props) {
  const [userid, setUserid] = useRecoilState(myuid);
  const [username, setUsername] = useRecoilState(myname);
  const [keyword, setKeyword] = useState("");
  const [room, setRoom] = useState("");
  const router = useRouter();

  const onChangeKeyword = async () => {
    await setDoc(doc(getFirestore(firebaseApp), "chat", room), {
      writer1: userid,
      writer2: keyword,
      _id: room,
      room: room,
    });
    router.push(`/boards`);
    router.push(`/chat`);
  };

  const onChangeSearchbar = (event) => {
    setKeyword(event.target.value);
  };
  const onChangeRoom = (event) => {
    setRoom(event.target.value);
  };

  const onClickButton = () => {
    onChangeKeyword();
  };

  return (
    <Searchbar>
      <SearchbarInput2
        placeholder="새 채팅방의 이름을 입력하세요"
        onChange={onChangeRoom}
      />
      <div>|</div>
      <SearchbarInput
        placeholder="채팅하고 싶은 사용자의 아이디를 입력하세요"
        onChange={onChangeSearchbar}
      />
      <Button onClick={onClickButton}>추가</Button>
    </Searchbar>
  );
}
