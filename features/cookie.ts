import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseCookies } from 'nookies';

export type CookieState = {
  displayName?: string;
  accessToken?: string;
  avatarUrl?: string;
};

const initialState: CookieState = {
  displayName: parseCookies().displayName,
  accessToken: parseCookies().accessToken,
  avatarUrl: parseCookies().avatarUrl,
};

export const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    signIn: (_, action: PayloadAction<CookieState>) => action.payload,
    signOut: (_) => ({} as CookieState),
  },
});
