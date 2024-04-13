import { useState } from "react";
import {
  FireFilledIcon,
  Searchbar,
  SearchbarInput,
} from "../../../styles/Searchbars01.styles";
import _ from "lodash";
import { collection,endAt,getDocs,getFirestore,orderBy,query, startAt, where } from "firebase/firestore/lite";
import { firebaseApp } from "../../firebase";

export default function Searchbars01(props) {
  const [keyword, setKeyword] = useState("");

  const onChangeKeyword = async() => {
    let a
    const q = query(
      collection(getFirestore(firebaseApp),"board"),
      orderBy("title"), // 제목 정렬
      startAt(keyword),
      endAt(keyword + "\uf8ff")
    )
    const resSnap = await getDocs(q);
    const searchData = resSnap.docs.map((doc) => doc.data());
    props.setSearchResult(searchData);
      console.log(searchData)
    props.setDocData(searchData)
  };



  const onChangeSearchbar = (event) => {
    // const a = (event.target.value).split('')
    // console.log(a)
    // setKeyword(a);
    setKeyword(event.target.value);
  };

  const onClickButton =()=>{

    onChangeKeyword()
  }

  
  return (
    <Searchbar>
      <SearchbarInput
        placeholder="동물의 종류만 검색 가능합니다." 
        onChange={onChangeSearchbar}
      />
      <button onClick={onClickButton}>검색</button>
    </Searchbar>
  );
}
