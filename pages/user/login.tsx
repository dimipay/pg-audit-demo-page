import { css } from '@emotion/react';
import axios from 'axios';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Checkbox from '../../components/form/CheckBox';
import TextInput from '../../components/form/TextInput';
import { RefreshResponse } from '../../components/SiteHeader';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const fetchLogin = async (data: FieldValues) => {
    try {
      const response = await axios.post<LoginResponse>(
        'https://dimipay-pg.herokuapp.com/auth/signin',
        {
          email: data.email,
          password: data.password,
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
      axios('https://dimipay-pg.herokuapp.com/auth/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
        .then((response) => {
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.code === 'TOKEN_EXPIRED') {
            axios
              .post<RefreshResponse>(
                'https://dimipay-pg.herokuapp.com/auth/refresh',
                {},
                {
                  headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                  },
                },
              )
              .then((response) => {
                setCookie('accessToken', response.data.accessToken);
                setCookie('refreshToken', response.data.refreshToken);
                router.reload();
              })
              .catch((error) => {
                console.log(error);
                deleteCookie('accessToken');
                deleteCookie('refreshToken');
                router.reload();
              });
          } else {
            router.push('/user/login');
          }
        });
    } else {
      router.push('/user/login');
    }
    return;
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
            await fetchLogin(data);
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
            ?????????
          </span>
          <TextInput
            label="????????? ??????"
            inputId="email"
            isSecret={false}
            register={register}
            errors={errors}
            registerOption={{
              required: '????????? ????????? ??????????????????.',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: '????????? ?????? ????????? ???????????? ????????????.',
              },
            }}
          />
          <TextInput
            label="????????????"
            inputId="password"
            isSecret={true}
            register={register}
            errors={errors}
            registerOption={{
              required: '??????????????? ??????????????????.',
            }}
          />
          {/* <Checkbox label="????????? ?????? ??????" inputId="save-login" register={register} /> */}
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
              <Link href="/user/register">????????????</Link>
              <span>| </span>
              <Link href="/user/findpw">???????????? ??????</Link>
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
              {isSubmitting ? '????????? ???...' : '?????????'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
