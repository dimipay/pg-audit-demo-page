import { css } from '@emotion/react';
import Image from 'next/image';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

import DemoApp from '../public/images/DemoApp.png';

const titleStyle = css`
  font-size: 3rem;
  font-weight: 700;

  @media (min-width: 1000px) {
    padding: 0 80px;
  }
`;

const Home = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
      `}>
      <SiteHeader />
      <div
        css={css`
          background: #38c8d1;
          width: 100%;
          height: calc(100vh - 60px);
          display: flex;
          justify-content: center;
        `}>
        <div
          css={css`
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            overflow: hidden;
            flex-direction: column;

            @media (min-width: 1000px) {
              flex-direction: row;
              max-width: 1000px;
            }
          `}>
          <div
            css={css`
              margin: 50px 0;
              width: 50%;
              color: white;
            `}>
            <h1 css={titleStyle}>완전히 새로워진</h1>
            <h1 css={titleStyle}>매점 결제 시스템</h1>
          </div>
          <div
            css={css`
              margin: auto;
              width: 50%;
              width: 374px;
              height: 720px;
            `}>
            <Image src={DemoApp} layout="responsive" priority />
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default Home;
