import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import Image, { StaticImageData } from 'next/image';

import { globalUserState } from '../libs/atom';

import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

import AppleMangoJpg from '../public/images/apple_mango.jpg';
import JadooTeaJpg from '../public/images/jadoo_tea.jpg';
import LemonTeaPng from '../public/images/lemon_tea.png';
import PeachTeaPng from '../public/images/peach_tea.png';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

interface IProduct {
  productId: number;
  productName: string;
  productPrice: number;
  productImage: StaticImageData;
}

const ProductData: IProduct[] = [
  {
    productId: 1,
    productName: '애플망고',
    productPrice: 910,
    productImage: AppleMangoJpg,
  },
  {
    productId: 2,
    productName: '자두녹차',
    productPrice: 910,
    productImage: JadooTeaJpg,
  },
  {
    productId: 3,
    productName: '레몬녹차',
    productPrice: 910,
    productImage: LemonTeaPng,
  },
  {
    productId: 4,
    productName: '복숭아녹차',
    productPrice: 910,
    productImage: PeachTeaPng,
  },
];

const Product: React.FC<{
  product: IProduct;
  handleProduct: (product: IProduct) => void;
}> = ({ product, handleProduct }) => {
  return (
    <div
      css={css`
        margin: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      `}>
      <div>
        <Image src={product.productImage} alt={product.productName} width={200} height={200} />
      </div>
      <div
        css={css`
          padding: 10px;
          width: 100%;
          display: flex;
          flex-direction: column;
        `}>
        <span
          css={css`
            margin-right: auto;
            font-weight: 700;
            font-size: 1.3rem;
          `}>
          {product.productName}
        </span>
        <span
          css={css`
            margin-left: auto;
            font-weight: 500;
            font-size: 1.1rem;
          `}>
          {product.productPrice.toLocaleString()}원
        </span>
        <button
          css={css`
            margin-top: 5px;
            padding: 8px 10px;
            border-radius: 5px;
            border: none;
            background: #2ea4ab;
            transition: 0.2s ease-in-out;
            color: white;

            &:hover {
              background: #207377;
            }
          `}
          onClick={() => {
            handleProduct(product);
          }}>
          결제하기
        </button>
      </div>
    </div>
  );
};

const Products: React.FC<{
  clientId: string;
}> = ({ clientId }) => {
  const [user] = useRecoilState(globalUserState);

  const router = useRouter();

  const handleProduct = (product: IProduct) => {
    if (!user.isLoggedIn) return router.push('/user/login');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.AUTHNICE.requestPay({
      clientId: clientId,
      method: 'card',
      orderId: uuidv4(),
      amount: product.productPrice,
      goodsName: product.productName,
      returnUrl: 'https://dimipay-pg-exam.herokuapp.com/payment/serverAuth',
      mailUserId: user.id,
      mailReserved: JSON.stringify({
        id: user.id,
      }),
      fnError: (err) => {
        alert(err.errorMsg);
      },
    });
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      console.log('user logined');
    }
  }, [user]);

  // const openSubPopup = (product: SubscribeProduct) => {
  //   setSelectedProduct(product);
  //   setOnSubscribeModal(true);
  // };

  return (
    <div
      css={css`
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      `}>
      {/*<OnSubModal*/}
      {/*  product={*/}
      {/*    selectedProduct || {*/}
      {/*      id: '0',*/}
      {/*      name: '테스트 상품',*/}
      {/*      detail: '테스트 상품입니다',*/}
      {/*      price: 0,*/}
      {/*    }*/}
      {/*  }*/}
      {/*  cardList={cardList}*/}
      {/*  isPopup={onSubscribeModal}*/}
      {/*  setIsPopup={setOnSubscribeModal}*/}
      {/*/>*/}
      <SiteHeader />
      <div
        css={css`
          width: 100%;
          height: 200px;
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
            일반 상품
          </h1>
          <h2>다양한 매점의 상품을 온라인으로 결제하세요.</h2>
        </div>
      </div>
      <div
        css={css`
          padding: 60px 50px;
          width: 100%;
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 850px;
        `}>
        {ProductData.map((product, index) => (
          <Product
            product={product}
            // isLoggedIn={user.isLoggedIn}
            handleProduct={handleProduct}
            key={index}
          />
        ))}
      </div>
      <SiteFooter />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      clientId: process.env.NICEPAY_CLIENT_ID,
    },
  };
};

export default Products;
