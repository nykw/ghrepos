import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseCookies } from 'nookies';
import { Cookie } from '../lib/cookie';

export type CookieState = Cookie;

const initialState: CookieState = {
  displayName: parseCookies().displayName,
  accessToken: parseCookies().accessToken,
  avatarUrl: parseCookies().avatarUrl,
};

export const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    register: (_, action: PayloadAction<CookieState>) => action.payload,
  },
});
