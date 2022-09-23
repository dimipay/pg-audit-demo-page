import { css } from '@emotion/react';
import Link from 'next/link';

const personalData = () => {
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
          개인정보취급방침
        </span>
      </div>
    </div>
  );
};

export default personalData;
