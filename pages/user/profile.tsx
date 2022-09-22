import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SiteHeader, { RefreshResponse } from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useRecoilState } from 'recoil';
import { globalUserState } from '../../libs/atom';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { FieldValues, useForm } from 'react-hook-form';
import TextInput from '../../components/form/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

interface CardInfo {
  id: string;
  name: string;
  createdAt: string;
}

const CardBox: React.FC<{
  id: string;
  name: string;
}> = ({ name }) => {
  return (
    <button
      css={css`
        margin: 0 10px;
        width: 200px;
        height: 120px;
        padding: 10px;
        background: #38c8d1;
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        border: none;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
        flex: 0 0 auto;
        transition: all 0.2s ease-in-out;

        &:hover {
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
        }

        & span {
          text-align: left;
          width: 100%;
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
        }

        & p {
          margin: 0 0 0 auto;
          border: none;
          background: transparent;
          color: white;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
        }
      `}>
      <span>{name}</span>
      <p>관리하기</p>
    </button>
  );
};

interface CardKeyResponse {
  id: string;
  name: string;
  createdAt: string;
}

const OnCardModal: React.FC<{
  isPopup: boolean;
  setIsPopup: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isPopup, setIsPopup }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const fetchAddCard = async (data: FieldValues) => {
    try {
      await axios.post<CardKeyResponse>(
        'https://dimipay-pg-exam.herokuapp.com/payment/key',
        {
          cardNo: data.cardNo,
          expYear: data.expYear,
          expMonth: data.expMonth,
          idNo: data.idNo,
          cardPw: data.cardPw,
          cardName: data.cardName,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        },
      );
      router.reload();
      return;
    } catch (err) {
      console.log(err);
      if (err.response.data.code === 'CARD_INFO_NOT_MATCH') {
        setError('cardNo', { type: 'custom', message: '카드 정보가 올바르지 않습니다.' });
      } else if (err.response.data.code === 'CARD_ALREADY_REGISTERED') {
        setError('cardNo', { type: 'custom', message: '이미 등록된 카드입니다.' });
      } else {
        reset();
        setIsPopup(false);
        alert('알 수 없는 오류입니다. 지속될 경우 관리자에게 문의해주세요.');
      }
      throw err;
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
          await fetchAddCard(data);
        })}>
        <span
          css={css`
            font-size: 1.2rem;
            font-weight: 500;
          `}>
          새로운 카드 등록하기
        </span>
        <TextInput
          label="카드이름 (선택)"
          inputId="cardName"
          isSecret={false}
          register={register}
          errors={errors}
          placeholder="등록할 카드의 이름"
        />
        <TextInput
          label="카드번호"
          inputId="cardNo"
          isSecret={false}
          register={register}
          errors={errors}
          registerOption={{
            required: '카드 번호를 입력해주세요',
            pattern: {
              value: /^[0-9]{16}$/g,
              message: '카드 번호 형식이 올바르지 않습니다',
            },
          }}
          placeholder="카드번호 16자리 (숫자만)"
        />
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}>
          <TextInput
            label="만료월"
            inputId="expMonth"
            isSecret={false}
            register={register}
            errors={errors}
            registerOption={{
              required: '필수항목입니다',
              pattern: {
                value: /^[0-9]{2}$/g,
                message: '유효하지 않은 값',
              },
            }}
            placeholder="MM"
          />
          <div
            css={css`
              width: 10px;
            `}
          />
          <TextInput
            label="만료년도"
            inputId="expYear"
            isSecret={false}
            register={register}
            errors={errors}
            registerOption={{
              required: '필수항목입니다',
              pattern: {
                value: /^[0-9]{2}$/g,
                message: '올바르지 않은 값입니다',
              },
            }}
            placeholder="YY"
          />
        </div>
        <TextInput
          label="생년월일"
          inputId="idNo"
          isSecret={false}
          register={register}
          errors={errors}
          registerOption={{
            required: '생년월일을 입력해주세요',
            pattern: {
              value: /^[0-9]{6}$/g,
              message: '올바르지 않은 생년월일입니다',
            },
          }}
          placeholder="주민등록번호 앞 6자리 (숫자만)"
        />
        <TextInput
          label="카드 비밀번호 (앞 2자리)"
          inputId="cardPw"
          isSecret={true}
          register={register}
          errors={errors}
          registerOption={{
            required: '비밀번호 앞 2자리를 입력해주세요',
            pattern: {
              value: /^[0-9]{2}$/g,
              message: '올바르지 않은 비밀번호입니다',
            },
          }}
          placeholder="00••"
        />
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
          {isSubmitting ? '등록 중...' : '카드 등록하기'}
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
          취소
        </button>
      </form>
    </div>
  );
};

interface PayHistoryResponse {
  id: string;
  price: number;
  cancled: string;
  createdAt: string;
  updatedAt: string;
  productName: string;
}

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useRecoilState(globalUserState);

  const [cardList, setCardList] = useState<Array<CardInfo>>([]);
  const [payList, setPayList] = useState<Array<PayHistoryResponse>>([]);

  const [onCardAddModal, setOnCardAddModal] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (!user.isLoggedIn) {
      if (hasCookie('accessToken')) {
        axios('https://dimipay-pg-exam.herokuapp.com/auth/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        })
          .then((response) => {
            setUser({
              isLoggedIn: true,
              name: response.data.name,
              email: response.data.email,
              id: response.data.id,
            });
          })
          .catch((error) => {
            console.log(error);
            if (error.response.data.code === 'TOKEN_EXPIRED') {
              axios
                .post<RefreshResponse>(
                  'https://dimipay-pg-exam.herokuapp.com/auth/refresh',
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${getCookie('accessToken')}`,
                    },
                  },
                )
                .then((response) => {
                  setCookie('accessToken', response.data.accessToken);
                  setCookie('refreshToken', response.data.refreshToken);
                  router.reload();
                })
                .catch((error) => {
                  console.log(error);
                  deleteCookie('accessToken');
                  deleteCookie('refreshToken');
                  router.reload();
                });
            } else {
              router.push('/user/login');
            }
          });
      } else {
        router.push('/user/login');
      }
      return;
    } else {
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
      axios
        .get<Array<PayHistoryResponse>>('https://dimipay-pg-exam.herokuapp.com/payment/history', {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        })
        .then((response) => {
          setPayList(response.data.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
      <OnCardModal isPopup={onCardAddModal} setIsPopup={setOnCardAddModal} />
      <SiteHeader />
      <div
        css={css`
          width: 100%;
          height: 200px;
          background: #38c8d1;
          display: flex;
          justify-content: center;
          align-items: center;
        `}>
        <div
          css={css`
            padding: 0 50px;
            max-width: 1000px;
            width: 100%;
            display: flex;
            justify-content: space-between;
          `}>
          <div
            css={css`
              height: 100%;
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
              <span
                css={css`
                  margin-right: 10px;
                  font-size: inherit;
                  font-weight: inherit;
                `}>
                {user.name}
              </span>
              님, 환영합니다!
            </h1>
            <h2
              css={css`
                margin-top: 6px;
                font-size: 1.1rem;
                font-weight: 500;
              `}>
              {user.email}
            </h2>
          </div>
          <button
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              border: none;
              background: transparent;

              & * {
                cursor: pointer;
              }

              & span {
                margin-top: 6px;
                color: white;
                font-size: 1rem;
                font-weight: 500;
              }
            `}
            onClick={() => {
              deleteCookie('accessToken');
              deleteCookie('refreshToken');
              setUser({
                isLoggedIn: false,
                name: '',
                email: '',
                id: '',
              });
              router.push('/');
            }}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              color="#ffffff"
              css={{
                width: '50px',
                height: '50px',
              }}
            />
            <span>로그아웃</span>
          </button>
        </div>
      </div>
      <div
        css={css`
          padding: 30px 50px;
          width: 100%;
          flex: 1;
          max-width: 850px;
        `}>
        <div>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}>
            <h2
              css={css`
                font-size: 1.5rem;
              `}>
              내 카드
            </h2>
            <button
              css={css`
                padding: 7px 12px;
                border: none;
                border-radius: 8px;
                background: #38c8d1;
                font-weight: 700;
                font-size: 0.9rem;
                line-height: 18px;
                color: white;
                transition: all 0.2s ease-in-out;

                &:hover {
                  background: #2ea4ab;
                }
              `}
              onClick={() => {
                setOnCardAddModal(true);
              }}>
              추가하기
            </button>
          </div>
          <hr />
          <div
            css={css`
              padding: 20px 10px;
              min-width: 100%;
              display: flex;
              flex-wrap: nowrap;
              overflow-x: auto;
              overflow-y: hidden;

              ::-webkit-scrollbar {
                padding: 0 8px;
                width: 4px;
                height: 8px;
              }

              ::-webkit-scrollbar-track {
                border: none;
              }

              ::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background: rgba(0, 0, 0, 0.2);
              }
            `}>
            {cardList.map((card, key) => (
              <CardBox id={card.id} name={card.name} key={key} />
            ))}
            {/* <CardBox name="카드1" cardId={1} />
            <CardBox name="카드2" cardId={2} />
            <CardBox name="카드3" cardId={3} /> */}
            <button
              css={css`
                margin: 0 10px;
                width: 200px;
                height: 120px;
                padding: 10px;
                display: inline-flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border: 2px dashed #38c8d1;
                border-radius: 10px;
                flex: 0 0 auto;
                background: transparent;
                transition: all 0.2s ease-in-out;

                & span {
                  font-size: 1rem;
                  font-weight: 500;
                  text-align: center;
                  cursor: pointer;
                }

                &:hover {
                  border: 2px dashed #2ea4ab;
                  background: rgba(46, 164, 171, 0.1);
                }
              `}
              onClick={() => {
                setOnCardAddModal(true);
              }}>
              <span>새로운 카드를 추가하여 편리한 매점결제를 시작해보세요!</span>
            </button>
          </div>
        </div>
        <div>
          <div
            css={css`
              margin-top: 40px;
            `}>
            <h2
              css={css`
                font-size: 1.5rem;
              `}>
              최근 결제기록
            </h2>
            <hr />
          </div>
          <div
            css={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              min-height: 200px;
            `}>
            {payList.length === 0 ? (
              <div
                css={css`
                  margin: auto;
                  display: flex;
                  flex-direction: column;

                  & span {
                    text-align: center;
                  }
                `}>
                <span>아직 결제 기록이 없네요...</span>
                <span>디미페이와 함께 편리한 매점결제를 시작해요!</span>
              </div>
            ) : (
              payList.map((pay, key) => {
                const date = new Date(pay.createdAt);
                console.log(date);
                return (
                  <div
                    css={css`
                      padding: 0 10px;
                      height: 40px;
                      width: 100%;
                      border: 1px solid #e5e5e5;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;

                      & span {
                        height: 100%;
                        line-height: 40px;
                      }
                    `}
                    key={key}>
                    <span
                      css={css`
                        width: 80px;
                        text-align: left;
                      `}>
                      {date.getFullYear()}.{date.getMonth() + 1}.{date.getDate()}.
                    </span>
                    <span
                      css={css`
                        margin-left: 10px;
                        padding: 0 10px;
                        flex: 1;
                        border-left: 1px solid #e5e5e5;

                        @media (min-width: 768px) {
                          margin-right: 10px;
                          border-right: 1px solid #e5e5e5;
                        }
                      `}>
                      {pay.productName}
                    </span>
                    <span
                      css={css`
                        width: 80px;
                        text-align: right;

                        @media (max-width: 768px) {
                          display: none;
                        }
                      `}>
                      {pay.price.toLocaleString()}원
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default UserProfilePage;
