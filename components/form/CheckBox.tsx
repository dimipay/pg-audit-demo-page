import { css } from '@emotion/react';
import { useState } from 'react';
import { FieldErrorsImpl, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface CheckboxProps {
  label: string;
  inputId: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrorsImpl;
  registerOption?: RegisterOptions;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  inputId,
  register,
  errors,
  registerOption,
}) => {
  const [isHovered, setHovered] = useState(false);
  const [isChecked, setChecked] = useState(false);

  if (registerOption)
    registerOption.onChange = () => {
      setChecked(!isChecked);
    };
  else
    registerOption = {
      onChange: () => {
        setChecked(!isChecked);
      },
    };

  return (
    <div
      css={css`
        margin: 32px 0;
        height: 24px;
      `}>
      <label
        htmlFor={inputId}
        css={css`
          display: flex;
          align-items: center;
          cursor: pointer;
        `}
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}>
        <input
          css={css`
            display: none;
            position: relative;
          `}
          id={inputId}
          type="checkbox"
          {...register(inputId, registerOption)}
        />
        <label
          htmlFor={inputId}
          css={css`
            width: 24px;
            height: 24px;
            cursor: pointer;
            outline: none;
            border: ${isHovered || isChecked ? '2px solid #2ea4ab' : '2px solid #e6e6e6'};
            border-radius: 8px;
            background: ${isChecked ? '#2ea4ab' : isHovered ? 'rgba(46, 164, 171, 0.2)' : '#fff'};
            position: relative;
            display: inline-block;
            transition: all 0.2s ease-in-out;

            &:after {
              opacity: ${isChecked ? 1 : 0};
              position: absolute;
              top: 5px;
              left: 3px;
              content: '';
              width: 14px;
              height: 10px;
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.343 4.574l4.243 4.243 7.07-7.071' fill='transparent' stroke-width='2' stroke='%23FFF' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
              transition: all 0.2s ease-in-out;
            }
          `}
        />
        <span
          css={css`
            margin-left: 6px;
            cursor: pointer;
            color: #4e5968;
            font-size: 0.9rem;
            font-weight: 600;
          `}>
          {label}
        </span>
      </label>
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

export default Checkbox;
