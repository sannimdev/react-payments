import React from 'react';

type TInputBox = {
  type: 'text' | 'password';
};

function InputBox({ type }: TInputBox) {
  return <input className="input-basic" type={type} />;
}

export default InputBox;
