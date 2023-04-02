import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Input = styled.input``;

const Button = styled.button``;

interface InputBoxProps {
  handleInputSubmit: (inputPrompt: string) => void;
}

function InputBox({ handleInputSubmit }: InputBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    if (inputRef.current) {
      handleInputSubmit(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <Wrapper>
      <Input ref={inputRef} />
      <Button onClick={handleButtonClick}>Send</Button>
    </Wrapper>
  );
}

export default InputBox;
