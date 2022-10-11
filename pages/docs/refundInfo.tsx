import { css } from '@emotion/react';
import Link from 'next/link';

const refundInfo = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
      `}>
      <div
        css={css`
          margin: 50px;
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
        `}>
        <span
          css={css`
            & a {
              font-weight: 900;
              font-size: 2.8rem;
              color: #2ea4ab;
            }
          `}>
          <Link href="/">DIMIPAY</Link>
        </span>
        <span
          css={css`
            font-size: 1.1rem;
            font-weight: 700;
          `}>
          환불정보
        </span>
      </div>
      <div
        css={css`
          margin: 0 50px;
          width: 100%;
          max-width: 1000px;
          display: flex;
          flex-direction: column;
        `}>
        <span>구독결제</span>
        <ul>
          <li>
            구독 결제 후, 미사용시 7일 이내 전액 환불이 가능하며, 7일이 경과한 경우 수수료를 공제한
            부분 환불이 가능합니다.
          </li>
          <li>
            환불 시 환불액 : 결제금액 - 결제금액X(경과일수/전체이용기간) - 수수료(환불 대상 상품
            결제 금액의 10%)
          </li>
        </ul>
        <span>일반결제</span>
        <ul>
          <li>상품 사용 이력이 없고, 결제일로부터 7일이 지나지 않은 경우 전액 환불 가능</li>
          <li>패키지 상품은 구성된 상품 중 일부만 환불 불가</li>
          <li>환불 시 환불액 : 결제금액 - 수수료(결제금액의 10%)</li>
          <li>※ 결제일로부터 7일 이내 환불 시 환불수수료가 차감되지 않습니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default refundInfo;
