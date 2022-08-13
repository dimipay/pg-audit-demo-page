import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavigateButton from './NavigateButton';

const SiteHeader = () => {
  const router = useRouter();

  return (
    <header
      css={css`
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        background: #ffffff;
      `}>
      <nav
        css={css`
          padding: 0 50px;
          max-width: 1050px;
          width: 100%;
          height: 60px;
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
          <NavigateButton destination="/">상품목록</NavigateButton>
          <NavigateButton destination="/">정기구독</NavigateButton>
          <NavigateButton destination="/">고객센터</NavigateButton>
          {/* <Link href="/">둘러보기</Link>
          <Link href="/">문의하기</Link> */}
        </div>
        <div>
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
              router.push('/login');
            }}>
            로그인
          </button>
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
