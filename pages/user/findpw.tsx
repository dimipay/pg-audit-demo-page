import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/form/TextInput';

const FindPWPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        & * {
          color: #4e5968;
          font-weight: 600;
        }
      `}>
      <div
        css={css`
          background: #ffffff;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}>
        <form
          css={css`
            padding: 0 20px;
            width: 100%;
            max-width: 470px;
            display: flex;
            flex-direction: column;
          `}
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}>
          <span
            css={css`
              & a {
                font-size: 2rem;
                font-weight: 900;
                color: #2ea4ab;
              }
            `}>
            <Link href="/">DIMIPAY</Link>
          </span>
          <span
            css={css`
              margin-top: 6px;
              font-size: 1.4rem;
              font-weight: 500;
            `}>
            비밀번호 찾기
          </span>
          <TextInput
            label="비밀번호를 찾을 계정의 이메일 주소를 입력해주세요."
            inputId="email"
            isSecret={false}
            register={register}
          />
          <div
            css={css`
              margin-top: 32px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
            `}>
            <button
              type="submit"
              css={css`
                padding: 11px 16px;
                border: none;
                border-radius: 8px;
                background: #2ea4ab;
                color: white;
                transition: all 0.2s ease-in-out;

                &:hover {
                  background: #207377;
                }
              `}>
              비밀번호 찾기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindPWPage;
