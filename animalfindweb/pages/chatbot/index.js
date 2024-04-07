import React, { useState } from 'react';

const Chatbot = () => {
   const [messages, setMessages] = useState([]);
   const [userInput, setUserInput] = useState('');
   const [loading, setLoading] = useState(false);

   const apiKey = process.env.NEXT_PUBLIC_CHATBOT;
   const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

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
               messages: [{ role: 'user', content:  '너는 동물박사야, 너는 모든 답변을 한국어로 해야해!'+ message }],
               max_tokens: 1024, // 답변 최대 글자 수, 
               top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
               temperature: 1, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
               frequency_penalty: 0.5, // 전문적 단어의 빈도, 낮을수록 전문적 (0~1)
               presence_penalty: 0.5, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
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

   return (
      <div id='Chatbot'>
         <h1>동물에 대해 물어보세요</h1>
         <div className='chatDiv'>
            {loading && <span className="messageWait">잠시만요 찾는중이에요</span>}
            {messages.map((msg, index) => (
               <div key={index} className={`message ${msg.sender}`}>
                  {`${msg.sender === 'user' ? '나' : '동물박사'} : ${msg.message}`}
               </div>
            ))}
         </div>
         <div className='inputDiv'>
            <input
               type='text' placeholder='어떤 동물이든 물어보세요'
               value={userInput} onChange={(e) => setUserInput(e.target.value)}
               onKeyDown={handleKeyDown}
            />
            <button onClick={handleSendMessage}>전송</button>
         </div>
      </div>
   );
};

export default Chatbot;
