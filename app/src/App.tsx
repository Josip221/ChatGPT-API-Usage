import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputBox from './InputBox';
import ChatBox from './ChatBox';

const Wrapper = styled.div``;

const API_URL = 'http://127.0.0.1:3005/ask';

function App() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleInputSubmit = async (inputPrompt: string) => {
    console.log(inputPrompt);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputPrompt,
        }),
      });
      console.log(response);
    } catch (error) {
      console.log(`An error occured ${error}`);
    }

    //setMessages(prevState => [...prevState, response]);
  };

  return (
    <Wrapper>
      <InputBox handleInputSubmit={handleInputSubmit} />
      <ChatBox />
    </Wrapper>
  );
}

export default App;
