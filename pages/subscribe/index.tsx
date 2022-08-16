import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import React from 'react';
import axios from 'axios';
import SiteHeader from '../../components/SiteHeader';

interface SubscribeProduct {
  id: string;
  name: string;
  price: number;
  detail: string;
}

const SubscribeInfoPage: React.FC<{
  products: Array<SubscribeProduct>;
}> = ({ products }) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}>
      <SiteHeader />
      <div
        css={css`
          padding-top: 60px;
          width: 100%;
          height: 260px;
          background: #38c8d1;
        `}>
        <div
          css={css`
            padding: 0 50px;
            margin: 0 auto;
            height: 100%;
            width: 100%;
            max-width: 1050px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            & * {
              color: white;
            }
          `}>
          <h1
            css={css`
              font-size: 2.5rem;
              font-weight: 700;
            `}>
            정기구독 상품
          </h1>
          <h2>저렴한 가격에 매점의 다양한 상품을 만나보세요</h2>
        </div>
      </div>
      <div
        css={css`
          padding: 10px 50px 0 50px;
          width: 100%;
          max-width: 850px;
        `}>
        {products.map((product, index) => (
          <div
            key={index}
            css={css`
              margin: 30px 0;
              padding: 10px;
              width: 100%;
              height: 100px;
              display: flex;
              justify-content: space-between;
              border-radius: 8px;
              box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
              overflow: hidden;
            `}>
            <div
              css={css`
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `}>
              <span
                css={css`
                  font-size: 1.7rem;
                  font-weight: 800;
                `}>
                {product.name}
              </span>
              <span>{product.detail}</span>
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-end;
                text-align: right;
              `}>
              <span
                css={css`
                  font-size: 1.4rem;
                  font-weight: 500;
                `}>
                {product.price.toLocaleString('ko-KR')}원 / 월
              </span>
              <button
                css={css`
                  padding: 8px 12px;
                  border: none;
                  border-radius: 8px;
                  background: #2ea4ab;
                  color: white;
                  font-size: 0.9rem;
                  font-weight: 600;
                  transition: 0.2s ease-in-out;
                  cursor: pointer;

                  &:hover {
                    background: #207377;
                  }
                `}>
                구독하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get<Array<SubscribeProduct>>(
      'https://dimipay-pg-exam.herokuapp.com/products',
    );

    return {
      props: {
        products: response.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default SubscribeInfoPage;
