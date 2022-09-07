import { atom } from 'recoil';

export const globalUserState = atom({
  key: 'globalUserState',
  default: {
    isLoggedIn: false,
    name: '',
    email: '',
  },
});
