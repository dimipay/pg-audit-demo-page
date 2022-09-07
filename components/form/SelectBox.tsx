/* eslint-disable indent */
import { css } from '@emotion/react';
import { FieldErrorsImpl, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface SelectBoxProps {
  label: string;
  selectId: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrorsImpl;
  registerOption?: RegisterOptions;
  children: React.ReactNode;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  selectId,
  register,
  errors,
  registerOption,
  children,
}) => {
  return (
    <div
      css={css`
        margin-top: 32px;
        display: flex;
        flex-direction: column;
      `}>
      <label
        css={css`
          margin-bottom: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #4e5968;
        `}
        htmlFor={selectId}>
        {label}
      </label>
      <div
        css={css`
          width: 100%;
          height: 40px;
          border-radius: 8px;
          box-shadow: ${errors?.[selectId] !== undefined
            ? 'inset 0px 0px 0px 1px #f66570, 0px 0px 0px 1px #f66570 !important'
            : 'inset 0px 0px 0px 1px #e6e6e6'};
          display: flex;
          align-items: center;
          transition: all 0.2s ease-in-out;

          &:hover {
            box-shadow: inset 0px 0px 0px 1px rgba(46, 164, 171, 0.5),
              0px 0px 0px 1px rgba(46, 164, 171, 0.5);
          }
        `}>
        <select
          id={selectId}
          css={css`
            padding: 6px 4px;
            border-radius: 8px;
            width: 100%;
            height: 40px;
            border: none;
            background: none;
            appearance: none;

            &:focus {
              outline: none;
            }
          `}
          {...register('cardId', registerOption)}>
          {children}
        </select>
      </div>
      {errors?.[selectId] !== undefined ? (
        <span
          css={css`
            display: block;
            position: relative;
            margin-top: 4px;
            color: #f66570;
            font-size: 0.9rem;
          `}>
          {errors?.[selectId]?.message?.toString()}
        </span>
      ) : null}
    </div>
  );
};

export default SelectBox;
