/* eslint-disable indent */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { FieldErrorsImpl, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

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
      ? 'inset 0px 0px 0px 1px #f66570, 0px 0px 0px 1px #f66570 !important'
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
  isSecret: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrorsImpl;
  placeholder?: string;
  registerOption?: RegisterOptions;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  inputId,
  isSecret,
  register,
  errors,
  placeholder,
  registerOption,
}) => {
  const [isInputFocused, setInputFocused] = useState(false);

  if (registerOption)
    registerOption.onBlur = () => {
      setInputFocused(false);
    };
  else
    registerOption = {
      onBlur: () => {
        setInputFocused(false);
      },
    };

  return (
    <div
      css={css`
        margin-top: 32px;
        width: 100%;
        height: 60px;
      `}>
      <Label htmlFor={inputId}>{label}</Label>
      <InputWrapper isErrored={errors?.[inputId] !== undefined} isFocused={isInputFocused}>
        <input
          css={InputStyle}
          id={inputId}
          type={isSecret ? 'password' : 'text'}
          placeholder={placeholder}
          onFocus={() => {
            setInputFocused(true);
          }}
          {...register(inputId, registerOption)}
        />
      </InputWrapper>
      {errors?.[inputId] !== undefined ? (
        <span
          css={css`
            display: block;
            position: relative;
            margin-top: 4px;
            color: #f66570;
            font-size: 0.9rem;
          `}>
          {errors?.[inputId]?.message?.toString()}
        </span>
      ) : null}
    </div>
  );
};

export default TextInput;
