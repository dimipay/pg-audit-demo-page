import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import NavigateButton from './NavigateButton';
import { useRecoilState } from 'recoil';
import { globalUserState } from '../libs/atom';

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

const SiteHeader = () => {
  const router = useRouter();

  const [user, setUser] = useRecoilState(globalUserState);

  useEffect(() => {
    if (hasCookie('accessToken')) {
      axios('https://dimipay-pg.herokuapp.com/auth/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
        .then((response) => {
          setUser({
            isLoggedIn: true,
            name: response.data.name,
            email: response.data.email,
            id: response.data.id,
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.code === 'TOKEN_EXPIRED') {
            axios
              .post<RefreshResponse>('https://dimipay-pg.herokuapp.com/auth/refresh', {
                refreshToken: getCookie('refreshToken'),
              })
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
          }
        });
    }
  }, []);

  return (
    <header
      css={css`
        box-shadow: 3px 0 10px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        text-align: center;
        z-index: 999;
        background: #ffffff;
      `}>
      <nav
        css={css`
          padding: 0 50px;
          max-width: 1050px;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}>
        <div
          css={css`
            display: flex;
            align-items: center;

            & > button {
              margin: 0 6px;
              font-size: 1rem;
            }
          `}>
          <span
            css={css`
              margin-right: 15px;

              & a {
                font-size: 1.5rem;
                font-weight: 900;
                color: #2ea4ab;
              }
            `}>
            <Link href="/">DIMIPAY</Link>
          </span>
          <NavigateButton router={router} destination="/products">
            일반상품
          </NavigateButton>
          <NavigateButton router={router} destination="/subscribe">
            정기구독
          </NavigateButton>
          {/* <NavigateButton destination="/">고객센터</NavigateButton> */}
          {/* <Link href="/">둘러보기</Link>
          <Link href="/">문의하기</Link> */}
        </div>
        <div
          css={css`
            ${user.isLoggedIn ? `height: 20px; width: 20px;` : ''}
          `}>
          {user.isLoggedIn ? (
            <button
              css={css`
                border: none;
                background: transparent;

                & svg,
                & svg path {
                  cursor: pointer;
                }
              `}
              onClick={() => {
                router.push('/user/profile');
              }}>
              <FontAwesomeIcon
                icon={faUserCircle}
                color="#262626"
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
            </button>
          ) : (
            <button
              css={css`
                padding: 7px 12px;
                border: none;
                border-radius: 8px;
                background: #2ea4ab;
                font-weight: 700;
                font-size: 0.9rem;
                line-height: 18px;
                color: white;
                transition: all 0.2s ease-in-out;

                &:hover {
                  background: #207377;
                }
              `}
              onClick={() => {
                router.push('/user/login');
              }}>
              로그인
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
