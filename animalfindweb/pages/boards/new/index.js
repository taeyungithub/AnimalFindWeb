import * as S from "../../../styles/boardsNew";
import { useState } from "react";
import { useRouter } from "next/router";
import { firebaseApp } from "../../../src/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { myname, myuid } from "../../../src/stores";
import { useRecoilState } from "recoil";
import React from "react";

export default function BoardsNewPage() {
  //recoil 이용 uid와 닉네임 가져오기
  const [userid, setUserid] = useRecoilState(myuid);
  const [username, setUsername] = useRecoilState(myname);

  const router = useRouter();

  // 제목 비밀번호 작성자 내용 다쓰면 등록하기 button ON
  const [isActive, setIsActive] = useState(false);
  // 주소입력창 띄우기위해 필요
  const [isOpen, setIsOpen] = useState(false);

  const [writer, setWriter] = useState(username);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [writerError, setWriterError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");

  const [fileUrl1, setfileUrl1] = useState("");
  const [fileUrl2, setfileUrl2] = useState("");
  const [fileUrl3, setfileUrl3] = useState("");

  // 등록하기 button ON
  const onChangeTitle = (event) => {
    // 제목값을 input값으로 변경
    setTitle(event.target.value);
    if (event.target.value !== "") {
      setTitleError("");
    }

    if (event.target.value !== "" && contents !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
    if (event.target.value !== "") {
      setContentsError("");
    }

    if (title !== "" && event.target.value !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onClickAddressSearch = () => {
    setIsOpen((prev) => !prev);
  };

  const onCompleteAddressSearch = (data) => {
    setAddress(data.address);
    setZipcode(data.zonecode);
    setIsOpen((prev) => !prev);
  };
  // 사진 이미지를 파이어베이스 클라우드 스토리지에 url로 저장
  const onFileChange1 = async (event) => {
    console.log(event.target.files[0]);
    const storage = getStorage(firebaseApp);

    const uploaded_file = await uploadBytes(
      ref(storage, `${userid + random}/${event.target.files[0].name}`),
      event.target.files[0]
    );

    const file_url = await getDownloadURL(uploaded_file.ref);
    setfileUrl1(file_url);
  };

  const onFileChange2 = async (event) => {
    console.log(event.target.files[0]);
    const storage = getStorage(firebaseApp);

    const uploaded_file = await uploadBytes(
      ref(storage, `${userid + random}/${event.target.files[0].name}`),
      event.target.files[0]
    );

    const file_url = await getDownloadURL(uploaded_file.ref);
    setfileUrl2(file_url);
  };

  const onFileChange3 = async (event) => {
    console.log(event.target.files[0]);
    const storage = getStorage(firebaseApp);

    const uploaded_file = await uploadBytes(
      ref(storage, `${userid + random}/${event.target.files[0].name}`),
      event.target.files[0]
    );

    const file_url = await getDownloadURL(uploaded_file.ref);
    setfileUrl3(file_url);
  };

  const random = Math.floor(Math.random() * 100000000000);
  const options = { timeZone: "Asia/Seoul" };
  const currentDate = String(new Date().toLocaleDateString("ko-KR", options));

  const onClickSubmit = async () => {
    if (!writer) {
      setWriterError("작성자를 입력해주세요.");
    }
    if (!title) {
      setTitleError("제목을 입력해주세요.");
    }
    if (!contents) {
      setContentsError("내용을 입력해주세요.");
    }

    if (writer && title && contents) {
      alert("게시글이 등록되었습니다.");
      try {
        // board에 저장하기
        await setDoc(
          doc(getFirestore(firebaseApp), "board", `${userid + random}`),
          {
            writer: writer,
            title: title,
            contents: contents,
            _id: userid + random,
            createdAt: currentDate,
            timestamp: new Date(),
            zipcode: zipcode,
            address: address,
            fileUrl1: fileUrl1,
            fileUrl2: fileUrl2,
            fileUrl3: fileUrl3,
          }
        );
        router.push(`/boards/${userid + random}`);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <S.AddressModal visible={true}>
          <S.AddressSearchInput onComplete={onCompleteAddressSearch} />
        </S.AddressModal>
      )}

      <S.Wrapper>
        <S.Title>게시물 등록</S.Title>
        <S.WriterWrapper>
          <S.InputWrapper>
            <S.Label>작성자</S.Label>
            <S.Writer type="text" value={username} readOnly />
            <S.Error>{writerError}</S.Error>
          </S.InputWrapper>
        </S.WriterWrapper>
        <S.WriterWrapper>
          <S.InputWrapper>
            <S.Label>제목</S.Label>
            <S.Subject
              type="text"
              placeholder="동물종류/종  양식으로 작성해주세요"
              onChange={onChangeTitle}
            />
            <S.Error>{titleError}</S.Error>
          </S.InputWrapper>
        </S.WriterWrapper>
        <S.WriterWrapper>
          <S.InputWrapper>
            <S.Label>내용</S.Label>
            <S.Contents
              placeholder="내용을 작성해주세요."
              onChange={onChangeContents}
            />
            <S.Error>{contentsError}</S.Error>
          </S.InputWrapper>
        </S.WriterWrapper>

        <S.WriterWrapper>
          <S.InputWrapper>
            <S.Label>주소</S.Label>
            <S.ZipcodeWrapper>
              <S.Zipcode placeholder="도로명주소" readOnly value={zipcode} />
              <S.SearchButton onClick={onClickAddressSearch}>
                우편번호 검색
              </S.SearchButton>
            </S.ZipcodeWrapper>
            <S.Address readOnly value={address} />
          </S.InputWrapper>
        </S.WriterWrapper>

        <S.WriterWrapper>
          <S.ImageWrapper>
            <S.Label>사진첨부 (1~3개 사진을 첨부해주세요.)</S.Label>
            <input type="file" onChange={onFileChange1} />
            <br />
            <input type="file" onChange={onFileChange2} />
            <br />
            <input type="file" onChange={onFileChange3} />
          </S.ImageWrapper>
        </S.WriterWrapper>

        <S.ButtonWrapper>
          <S.SubmitButton
            onClick={onClickSubmit}
            isActive={isActive}
            disabled={!isActive}
          >
            등록하기
          </S.SubmitButton>
        </S.ButtonWrapper>
      </S.Wrapper>
    </>
  );
}
