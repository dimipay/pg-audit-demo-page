import { css } from '@emotion/react';
import { useRouter } from 'next/router';

interface NavigateButtonProps {
  destination: string;
  children?: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ destination, children }) => {
  const router = useRouter();

  return (
    <button
      css={css`
        border: none;
        border-radius: 8px;
        padding: 12px 10px;
        line-height: 20px;
        font-size: 15px;
        display: flex;
        background: white;
        transition: all 0.2s ease-in-out;

        &:hover {
          background: #f5f5f5;
        }
      `}
      onClick={() => {
        router.push(destination);
      }}>
      {children}
    </button>
  );
};

export default NavigateButton;
