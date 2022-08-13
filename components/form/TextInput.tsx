/* eslint-disable indent */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #4e5968;
`;

const InputWrapper = styled.div<{ isErrored: boolean; isFocused: boolean }>`
  margin-top: 6px;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.isErrored
      ? 'inset 0px 0px 0px 1px #ff0000, 0px 0px 0px 1px #ff0000 !important'
      : props.isFocused
      ? 'inset 0px 0px 0px 1px #2ea4ab, 0px 0px 0px 1px #2ea4ab !important'
      : 'inset 0px 0px 0px 1px #e6e6e6'};
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: inset 0px 0px 0px 1px rgba(46, 164, 171, 0.5),
      0px 0px 0px 1px rgba(46, 164, 171, 0.5);
  }
`;

const InputStyle = css`
  padding: 0 10px;
  border-radius: 8px;
  width: 100%;
  height: 40px;
  border: none;
  background: none;

  &:focus {
    outline: none;
  }
`;

interface TextInputProps {
  label: string;
  inputId: string;
  value: string;
  isSecret: boolean;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  inputId,
  value,
  isSecret,
  errorMessage,
  onChange,
}) => {
  const [isInputFocused, setInputFocused] = useState(false);

  return (
    <div
      css={css`
        margin-top: 32px;
        width: 100%;
        height: 60px;
      `}>
      <Label htmlFor={inputId}>{label}</Label>
      <InputWrapper isErrored={errorMessage !== undefined} isFocused={isInputFocused}>
        <input
          css={InputStyle}
          name={inputId}
          id={inputId}
          value={value}
          type={isSecret ? 'password' : 'text'}
          onFocus={() => {
            setInputFocused(true);
          }}
          onBlur={() => {
            setInputFocused(false);
          }}
          onChange={onChange}
        />
      </InputWrapper>
      {errorMessage !== undefined ? (
        <span
          css={css`
            display: block;
            position: relative;
            margin-top: 4px;
            color: #ff0000;
          `}>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

export default TextInput;
