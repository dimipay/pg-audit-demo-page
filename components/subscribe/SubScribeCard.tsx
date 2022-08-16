import { css } from '@emotion/react';
import React from 'react';

interface SubscribeCardProps {
  title: string;
  description: string;
  price: number;
  productLink: string;
}

const SubscribeCard: React.FC<SubscribeCardProps> = ({
  title,
  description,
  price,
  productLink,
}) => {
  return (
    <div
      css={css`
        width: 100%;
        max-width: 1000px;
      `}></div>
  );
};

export default SubscribeCard;
