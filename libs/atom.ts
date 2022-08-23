import { atom } from 'recoil';

export const globalLoadingState = atom({
  key: 'globalLoadingState',
  default: {
    isLoading: false,
    loadingMessage: '로딩 중....',
  },
});

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoggedIn: false,
    accessToken: '',
    refreshToken: '',
    user: {
      name: '',
      email: '',
    },
  },
});
