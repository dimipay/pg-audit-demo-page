import { css } from '@emotion/react';
import SiteHeader from '../../components/SiteHeader';

const SubscribeInfoPage = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
      `}>
      <SiteHeader />
      <div
        css={css`
          width: 100%;
          height: 800px;
          background: #38c8d1;
        `}></div>
    </div>
  );
};

export default SubscribeInfoPage;
