import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { firebaseApp } from "../firebase";
import { getDatabase, ref, child, onValue } from "firebase/database";
import styled from "@emotion/styled";
import { myname, myuid } from "../../src/stores";
import { useRecoilState } from "recoil";

const Wapper = styled.div`
  width: 1200%;
  height: 600px;

  display: flex;
  flex-direction: column; /* 아이템들을 세로 방향으로 정렬 */
  justify-content: center; /* 아이템들을 가운데 정렬 */
  align-items: center; /* 아이템들을 세로 방향으로 가운데 정렬 */
`;

const Border = styled.div`
  width: 1000px;
  height: 400px;
  padding: 10px;
  border: 4px solid black;
  border-radius: 6px;
  overflow: auto;
  display: flex;
  flex-direction: column; /* 아이템들을 세로 방향으로 정렬 */
  margin-top: 40px;
  background-color: pink;
`;

const Message = styled.div`
  display: inline-block;
  padding: 8px 16px;
  margin: 4px;
  border-radius: 8px;
  max-width: 70%;
  word-wrap: break-word;
`;

const UserMessage = styled(Message)`
  align-self: flex-end;
  background-color: #dcf8c6;
`;

const DoctorMessage = styled(Message)`
  align-self: flex-start;
  background-color: lightgray;
`;

export default function ChatList() {
  const router = useRouter();
  const [docData, setDocData] = useState([]); // 빈 객체로 초기화
  const [username, setUsername] = useRecoilState(myname);
  const url = router.asPath.substring(8);

  useEffect(() => {
    try {
      const dbRef = ref(getDatabase(firebaseApp));
      const chatRef = child(dbRef, url);
      const unsubscribe = onValue(chatRef, (snapshot) => {
        if (snapshot.exists()) {
          setDocData(snapshot.val());
          // console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }, []);

  // console.log(docData);

  const scrollContainerRef = useRef(null);
  useEffect(() => {
    // 컴포넌트가 업데이트될 때마다 스크롤 컨테이너의 스크롤 위치를 최하단으로 이동합니다.
    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight;
  }, [docData]); // docData가 변경될 때마다 스크롤 위치를 조절합니다.

  return (
    <Wapper>
      <Border ref={scrollContainerRef}>
        {Object.keys(docData).map((key) => {
          const message = docData[key];
          return (
            <React.Fragment key={key}>
              {message.writer === username ? (
                <UserMessage>{message.contents}</UserMessage>
              ) : (
                <DoctorMessage>{message.contents}</DoctorMessage>
              )}
            </React.Fragment>
          );
        })}
      </Border>
    </Wapper>
  );
}
