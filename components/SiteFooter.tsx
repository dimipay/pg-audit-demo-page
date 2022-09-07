import { css } from '@emotion/react';
import Link from 'next/link';

const SiteFooter = () => {
  return (
    <footer
      css={css`
        box-shadow: -3px 0 10px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
        z-index: 999;
        background: #ffffff;
      `}>
      <nav
        css={css`
          padding: 30px 50px;
          max-width: 1050px;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          @media (max-width: 768px) {
            padding: 30px 30px;
            flex-direction: column;
            align-items: flex-start;

            & span {
              text-align: left;
            }
          }
        `}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;

            & > button {
              margin: 0 6px;
              font-size: 1rem;
            }
          `}>
          <span
            css={css`
              width: 100%;
              text-align: left;
              font-weight: 700;
              font-size: 1rem;
            `}>
            완전히 새로워진
            <br />
            매점 결제 시스템
          </span>
          <span
            css={css`
              & a {
                font-size: 2.3rem;
                font-weight: 900;
                color: #2ea4ab;
              }
            `}>
            <Link href="/">DIMIPAY</Link>
          </span>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            text-align: right;

            & span {
              margin: 3px 0;
              font-size: 0.9rem;
            }
          `}>
          <span>대표자 : 박성수</span>
          <span>사업자등록번호 : 480-82-00518</span>
          <span>이메일 : dimicafe@dimigo.hs.kr</span>
        </div>
      </nav>
    </footer>
  );
};

export default SiteFooter;
