import { css } from '@emotion/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Checkbox from '../../components/form/CheckBox';
import TextInput from '../../components/form/TextInput';

const RegisterPage = () => {
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
            회원가입
          </span>
          <TextInput label="이메일 주소" inputId="email" isSecret={false} register={register} />
          <TextInput label="비밀번호" inputId="password" isSecret={true} register={register} />
          <TextInput
            label="비밀번호 확인"
            inputId="passwordCheck"
            isSecret={true}
            register={register}
          />
          <TextInput label="이름" inputId="name" isSecret={false} register={register} />
          <Checkbox
            label="[필수] 개인정보 수집 및 이용 동의"
            inputId="personalData"
            register={register}
          />
          <div
            css={css`
              margin-top: 32px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}>
            <div
              css={css`
                & * {
                  font-size: 0.9rem;
                  margin-right: 4px;
                }

                & a {
                  transition: color 0.2s ease-in-out;
                  text-decoration: underline;
                }

                & a:hover {
                  color: #2ea4ab;
                }
              `}>
              <span>이미 계정이 있으신가요?</span>
              <Link href="/user/login">로그인</Link>
            </div>
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
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
