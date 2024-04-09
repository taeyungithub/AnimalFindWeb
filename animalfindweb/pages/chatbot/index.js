import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";

const ChatContainer = styled.div`
   margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0; /* 배경색은 필요에 따라 수정하세요 */
`;

const PhoneFrame = styled.div`
  position: relative;
  width: 1000px; /* 핸드폰 프레임의 폭 */
  height: 600px; /* 핸드폰 프레임의 높이 */
  border-radius: 30px; /* 핸드폰 프레임의 모서리를 둥글게 만듦 */
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
`;

const ChatDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 80%; /* 채팅창이 핸드폰 화면의 80%를 차지하도록 설정 */
  padding: 20px;
  overflow-y: auto; /* 채팅창이 넘칠 경우 스크롤바가 나타나도록 설정 */
  width: 100%;
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
  background-color: #DCF8C6;
`;

const DoctorMessage = styled(Message)`
  align-self: flex-start;
  background-color: #EAEAEA;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: #fff;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 8px;
  margin-right: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasReceivedWelcomeMessage, setHasReceivedWelcomeMessage] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_CHATBOT;
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

  const initialPrompt = '너의 이름은 동물박사야, 너는 애완동물에 대해 모르는게 없어,너는 모든 답변을 한국어로 해야해!, 이제 이문장 뒤에 나오는 내용에만 답변하고 1024자 안으로 대답해줘';

  const addMessage = (sender, message) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }]);
  };

  const handleSendMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) return;
    addMessage('user', message);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: initialPrompt + ' ' + message }],
          max_tokens: 1024,
          top_p: 1,
          temperature: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0.5,
          stop: ['그만'],
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || 'No response';
      addMessage('bot', aiResponse);
    } catch (error) {
      console.error('오류 발생!', error);
      addMessage('오류 발생!');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 동물박사의 인사 메시지 추가
    if (!hasReceivedWelcomeMessage) {
      addMessage('bot', '안녕하세요, 애완동물에 대해 무엇이든지 물어보세요!');
      setHasReceivedWelcomeMessage(true);
    }
  }, []); // 빈 배열을 넘겨 초기 렌더링 시 한 번만 실행

  return (
    <ChatContainer>
      <PhoneFrame>
        <ChatDiv>
          {messages.map((msg, index) => (
            <React.Fragment key={index}>
              {msg.sender === 'user' ? (
                <UserMessage>나: {msg.message}</UserMessage>
              ) : (
                <DoctorMessage>동물박사: {msg.message}</DoctorMessage>
              )}
            </React.Fragment>
          ))}
        </ChatDiv>

        <InputDiv>
          <TextInput
            type='text'
            placeholder='어떤 동물이든 물어보세요'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSendMessage}>전송</Button>
        </InputDiv>
      </PhoneFrame>
    </ChatContainer>
  );
};

export default Chatbot;
