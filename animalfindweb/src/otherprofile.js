import React, { useState } from "react";
import { Button, Modal } from "antd";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import { firebaseApp } from "./firebase";
import { useRouter } from "next/router";
import { myname, myuid } from "../src/stores";
import { useRecoilState } from "recoil";

export default function Otherprofile(props) {
  const [uname, setuname] = useState();
  const [userid, setUserid] = useRecoilState(myuid);
  const [username, setUsername] = useRecoilState(myname);
  const [ucontents, setcontents] = useState();

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClickProfile = async (userId) => {
    //userid로 검색해서 프로필 따오기
    try {
      const a = doc(getFirestore(firebaseApp), "user", userId);
      const b = await getDoc(a);
      setuname(b.data().displayName);
      setcontents(b.data().contents);
    } catch (error) {
      console.error(error);
    }
  };

  const onClicktochat = async () => {
    router.push(`/chat`);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        프로필보기
      </Button>
      <Modal
        title="프로필보기"
        onClick={onClickProfile(props.uid)}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>닉네임 : {uname}</div>
        <div>사용자 아이디 : {props.uid}</div>
        <div>사용자 소개 : {ucontents}</div>
        <br></br>
        <div>채팅을 원할시 사용자 아이디를 복사해주세요!</div>
        <button onClick={onClicktochat}>채팅하러가기</button>
      </Modal>
    </>
  );
}
