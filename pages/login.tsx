import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';
import Checkbox from '../components/form/CheckBox';
import TextInput from '../components/form/TextInput';

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailSaveChecked, setEmailSaveChecked] = useState(false);

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
        <div
          css={css`
            padding: 0 20px;
            width: 100%;
            max-width: 470px;
            display: flex;
            flex-direction: column;
          `}>
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
            로그인
          </span>
          <TextInput
            label="이메일 주소"
            inputId="email"
            value={emailValue}
            isSecret={false}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <TextInput
            label="비밀번호"
            inputId="password"
            value={passwordValue}
            isSecret={true}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <Checkbox
            label="로그인 정보 저장"
            inputId="save-login"
            checked={emailSaveChecked}
            onChange={() => {
              setEmailSaveChecked(!emailSaveChecked);
            }}
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
                & a {
                  font-size: 0.9rem;
                  margin-right: 4px;
                }

                & a:hover {
                  color: #161b28;
                }
              `}>
              <Link href="/signup">회원가입</Link>
              <span>| </span>
              <Link href="/find-password">비밀번호 찾기</Link>
            </div>
            <button
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
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
