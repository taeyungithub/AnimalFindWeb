import { useState } from "react";
import {
  FireFilledIcon,
  Searchbar,
  SearchbarInput,
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

  const onChangeKeyword = async () => {
    await setDoc(doc(getFirestore(firebaseApp), "chat", userid + keyword), {
      writer1: userid,
      writer2: keyword,
      _id: userid + keyword,
    });
  };

  const onChangeSearchbar = (event) => {
    setKeyword(event.target.value);
  };

  const onClickButton = () => {
    onChangeKeyword();
  };

  return (
    <Searchbar>
      <SearchbarInput
        placeholder="채팅하고싶은 유저의 아이디를 입력하세요"
        onChange={onChangeSearchbar}
      />
      <Button onClick={onClickButton}>추가</Button>
    </Searchbar>
  );
}
