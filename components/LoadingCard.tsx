import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import PulseLoader from 'react-spinners/PulseLoader';
import { globalLoadingState } from '../libs/atom';

const LoadingCard = () => {
  const [loadingState] = useRecoilState(globalLoadingState);

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        transition: all 0.2s ease-in-out;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        opacity: ${loadingState.isLoading ? 1 : 0};
        display: ${loadingState.isLoading ? 'flex' : 'none'};
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}>
      <PulseLoader color="#ffffff" margin={4} />
      <span
        css={css`
          margin-top: 10px;
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
        `}>
        {loadingState.loadingMessage}
      </span>
    </div>
  );
};

export default LoadingCard;
