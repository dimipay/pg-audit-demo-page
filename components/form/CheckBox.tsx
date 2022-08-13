import { css } from '@emotion/react';
import { useState } from 'react';

interface CheckboxProps {
  label: string;
  inputId: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, inputId, checked, onChange }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <label
      htmlFor={inputId}
      css={css`
        margin-top: 32px;
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
        name={inputId}
        id={inputId}
        checked={checked}
        type="checkbox"
        onChange={onChange}
      />
      <label
        htmlFor={inputId}
        css={css`
          width: 24px;
          height: 24px;
          cursor: pointer;
          outline: none;
          border: ${isHovered || checked ? '2px solid #2ea4ab' : '2px solid #e6e6e6'};
          border-radius: 8px;
          background: ${checked ? '#2ea4ab' : isHovered ? 'rgba(46, 164, 171, 0.2)' : '#fff'};
          position: relative;
          display: inline-block;
          transition: all 0.2s ease-in-out;

          &:after {
            opacity: ${checked ? 1 : 0};
            position: absolute;
            top: 5px;
            left: 4px;
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
  );
};

export default Checkbox;
