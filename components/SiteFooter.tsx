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
              margin-right: auto;
              & a {
                font-size: 2.3rem;
                font-weight: 900;
                color: #2ea4ab;
              }
            `}>
            <Link href="/">DIMIPAY</Link>
          </span>
          <div
            css={css`
              margin-top: 5px;
              margin-right: auto;
              display: flex;
              justify-content: flex-start;
              & span a {
                margin-right: 7px;
                font-size: 0.9rem;
                font-weight: 500;
              }
            `}>
            <span>
              <Link href="/docs/refundInfo">환불정보</Link>
            </span>
            <span>
              <Link href="/docs/deliveryInfo">배송/교환규정</Link>
            </span>
            <span>
              <Link href="/docs/terms">이용약관</Link>
            </span>
            <span>
              <Link href="/docs/personalData">개인정보취급방침</Link>
            </span>
          </div>
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
          <span>디미고사회적협동조합 대표자 : 박성수</span>
          <span>사업자등록번호 : 480-82-00518</span>
          <span>통신판매업 신고번호 : 2022-경기안산-2151</span>
          <span>경기도 안산시 단원구 사세충열로 94</span>
          <span>TEL : 031)363-7800</span>
        </div>
      </nav>
    </footer>
  );
};

export default SiteFooter;
