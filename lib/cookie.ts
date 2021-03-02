import { destroyCookie, setCookie } from 'nookies';

export type Cookie = {
  displayName: string | undefined;
  accessToken: string | undefined;
  avatarUrl: string | undefined;
  idToken: string | undefined
};

/** 渡されたデータをCookieに登録する */
export const setCookies = (cookie: Cookie): void => {
  (Object.entries(cookie) as [keyof Cookie, string | undefined][]).forEach(([key, value]) => {
    switch (key) {
      case 'displayName':
      case 'accessToken':
      case 'avatarUrl':
      case 'idToken':
        if (value) {
          setCookie(null, key, value);
        } else {
          destroyCookie(null, key);
        }
        break;
      default:
        const _: never = key;
    }
  });
};
