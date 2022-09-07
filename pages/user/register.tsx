import { css } from '@emotion/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FieldValues, useForm } from 'react-hook-form';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import Checkbox from '../../components/form/CheckBox';
import TextInput from '../../components/form/TextInput';
import { useEffect } from 'react';

interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const password = watch('password');

  const fetchRegister = async (data: FieldValues) => {
    try {
      const response = await axios.post<RegisterResponse>(
        'https://dimipay-pg-exam.herokuapp.com/auth/signup',
        {
          email: data.email,
          password: data.password,
          name: data.name,
        },
      );
      setCookie('accessToken', response.data.accessToken);
      setCookie('refreshToken', response.data.refreshToken);
      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    if (hasCookie('accessToken')) {
      router.push('/');
    }
  }, []);

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
          onSubmit={handleSubmit(async (data) => {
            await fetchRegister(data);
            router.push('/');
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
          <TextInput
            label="이메일 주소"
            inputId="email"
            isSecret={false}
            register={register}
            errors={errors}
            registerOption={{
              required: '이메일 주소를 입력해주세요.',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: '이메일 주소 형식이 올바르지 않습니다.',
              },
            }}
          />
          <TextInput
            label="비밀번호"
            inputId="password"
            isSecret={true}
            register={register}
            errors={errors}
            registerOption={{
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]+$/g,
                message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
              },
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상이어야 합니다.',
              },
              maxLength: {
                value: 20,
                message: '비밀번호는 20자 이하여야 합니다.',
              },
            }}
          />
          <TextInput
            label="비밀번호 확인"
            inputId="passwordCheck"
            isSecret={true}
            register={register}
            errors={errors}
            registerOption={{
              required: '비밀번호 확인란을 입력해주세요.',
              validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
            }}
          />
          <TextInput
            label="이름"
            inputId="name"
            isSecret={false}
            register={register}
            errors={errors}
            registerOption={{
              required: '이름을 입력해주세요.',
              pattern: {
                value: /^[가-힣]+$/g,
                message: '이름 형식이 올바르지 않습니다.',
              },
              minLength: {
                value: 2,
                message: '이름은 2자 이상이어야 합니다.',
              },
              maxLength: {
                value: 5,
                message: '이름은 5자 이하여야 합니다.',
              },
            }}
          />
          <Checkbox
            label="[필수] 개인정보 수집 및 이용 동의"
            inputId="personalData"
            register={register}
            errors={errors}
            registerOption={{
              required: '개인정보 수집 및 이용에 동의해주세요.',
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

                &:hover,
                &:disabled {
                  background: #207377;
                }
              `}
              disabled={isSubmitting}>
              {isSubmitting ? '가입 중...' : '가입하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
