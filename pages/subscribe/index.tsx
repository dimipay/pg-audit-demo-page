import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import TextInput from '../../components/form/TextInput';
import { FieldValues, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { globalUserState } from '../../libs/atom';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import SelectBox from '../../components/form/SelectBox';

interface SubscribeProduct {
  id: string;
  name: string;
  price: number;
  detail: string;
}

interface PayResponse {
  id: string;
  price: number;
  createdAt: string;
  productName: string;
}

const OnSubModal: React.FC<{
  product: SubscribeProduct;
  cardList: Array<CardInfo>;
  isPopup: boolean;
  setIsPopup: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ product, cardList, isPopup, setIsPopup }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const fetchPay = async (data: FieldValues) => {
    try {
      const response = await axios.post<PayResponse>(
        'https://dimipay-pg-exam.herokuapp.com/payment/pay',
        {
          cardId: data.cardId,
          productId: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        },
      );
      alert('결제가 완료되었습니다.');
      router.reload();
      return;
    } catch (err) {
      console.log(err);
      alert('결제에 실패했습니다. 문제가 지속될 경우 관리자에게 문의해주세요.');
      reset();
      setIsPopup(false);
      // router.reload();
      return;
    }
  };

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        ${!isPopup ? 'display: none;' : ''}
      `}>
      <form
        css={css`
          padding: 20px;
          width: 400px;
          background: white;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        `}
        onSubmit={handleSubmit(async (data) => {
          await fetchPay(data);
        })}>
        <span
          css={css`
            font-size: 1.4rem;
            font-weight: 700;
          `}>
          {product.name}
        </span>
        <span
          css={css`
            margin-top: 2px;
          `}>
          구독을 진행합니다
        </span>
        <SelectBox
          label="카드 선택"
          selectId="cardId"
          register={register}
          errors={errors}
          registerOption={{
            validate: (value) => {
              if (value === 'undefined') {
                return '카드를 선택해주세요';
              }
            },
          }}>
          <option value="undefined">=== 카드를 선택하세요 ===</option>
          {cardList.map((card, key) => (
            <option value={card.id} key={key}>
              {card.name}
            </option>
          ))}
        </SelectBox>
        {/* <TextInput
          label="카드이름 (선택)"
          inputId="cardName"
          isSecret={false}
          register={register}
          errors={errors}
          placeholder="등록할 카드의 이름"
        /> */}
        <button
          type="submit"
          css={css`
            margin-top: 40px;
            padding: 11px 16px;
            border: none;
            border-radius: 8px;
            background: #2ea4ab;
            color: white;
            transition: all 0.2s ease-in-out;

            &:hover,
            &:disabled {
              background: #207377;
            }
          `}
          disabled={isSubmitting}>
          {isSubmitting ? '결제 중...' : `${product.price.toLocaleString()}원 결제하기`}
        </button>
        <button
          type="reset"
          css={css`
            margin-top: 10px;
            padding: 11px 16px;
            border: none;
            border-radius: 8px;
            border: 2px solid #2ea4ab;
            background: white;
            color: black;
            transition: all 0.2s ease-in-out;

            &:hover,
            &:disabled {
              background: #f4fafb;
            }
          `}
          onClick={() => {
            setIsPopup(false);
            reset();
          }}
          disabled={isSubmitting}>
          결제 취소
        </button>
      </form>
    </div>
  );
};

const Product: React.FC<{
  product: SubscribeProduct;
  isLoggedIn: boolean;
  openSubPopup: (product: SubscribeProduct) => void;
}> = ({ product, isLoggedIn, openSubPopup }) => {
  const router = useRouter();

  return (
    <div
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
          min-width: 400px;
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
          `}
          onClick={() => {
            if (isLoggedIn) openSubPopup(product);
            else router.push('/user/login');
          }}>
          구독하기
        </button>
      </div>
    </div>
  );
};

interface CardInfo {
  id: string;
  name: string;
  createdAt: string;
}

const SubscribeInfoPage: React.FC<{
  products: Array<SubscribeProduct>;
}> = () => {
  const [cardList, setCardList] = useState<Array<CardInfo>>([]);
  const [products, setProducts] = useState<Array<SubscribeProduct>>([]);

  const [selectedProduct, setSelectedProduct] = useState<SubscribeProduct | null>(null);

  const [onSubscribeModal, setOnSubscribeModal] = useState<boolean>(false);

  const [user] = useRecoilState(globalUserState);

  useEffect(() => {
    axios
      .get<Array<SubscribeProduct>>('https://dimipay-pg-exam.herokuapp.com/products')
      .then((response) => {
        setProducts(response.data);
        setSelectedProduct(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (user.isLoggedIn) {
      axios
        .get<Array<CardInfo>>('https://dimipay-pg-exam.herokuapp.com/payment/key', {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        })
        .then((response) => {
          setCardList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const openSubPopup = (product: SubscribeProduct) => {
    setSelectedProduct(product);
    setOnSubscribeModal(true);
  };

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
      <OnSubModal
        product={
          selectedProduct || {
            id: '0',
            name: '테스트 상품',
            detail: '테스트 상품입니다',
            price: 0,
          }
        }
        cardList={cardList}
        isPopup={onSubscribeModal}
        setIsPopup={setOnSubscribeModal}
      />
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
            정기구독 상품
          </h1>
          <h2>저렴한 가격에 매점의 다양한 상품을 만나보세요</h2>
        </div>
      </div>
      <div
        css={css`
          padding: 10px 50px 0 50px;
          width: 100%;
          flex: 1;
          max-width: 850px;
        `}>
        {products.map((product, index) => (
          <Product
            product={product}
            isLoggedIn={user.isLoggedIn}
            key={index}
            openSubPopup={openSubPopup}
          />
        ))}
      </div>
      <SiteFooter />
    </div>
  );
};

export default SubscribeInfoPage;
