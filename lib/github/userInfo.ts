/** GET /users/{username} APIの正常系の型 */
export type User = {
  avatar_url: string;
  bio: string | undefined;
  blog: string | undefined;
  company: string | undefined;
  created_at: string | undefined;
  email: string | undefined;
  events_url: string | undefined;
  followers: number;
  followers_url: string | undefined;
  following: number;
  following_url: string | undefined;
  gists_url: string | undefined;
  gravatar_id: string | undefined;
  hireable: boolean | undefined;
  html_url: string | undefined;
  id: number;
  location: string | undefined;
  login: string;
  name: string | undefined;
  node_id: string | undefined;
  organizations_url: string | undefined;
  public_gists: number | undefined;
  public_repos: number | undefined;
  received_events_url: string | undefined;
  repos_url: string | undefined;
  site_admin: boolean | undefined;
  starred_url: string | undefined;
  subscriptions_url: string | undefined;
  twitter_username: string | undefined;
  type: string | undefined;
  updated_at: string | undefined;
  url: string | undefined;
};

/** 不正なユーザー名で呼び出されたときに発生する例外 */
export class InvalidUserNameError extends Error {
  name = 'Invalid username';
  message: string;
  constructor(user: string[]) {
    super();
    this.message = `${user.join('/')} は不正なユーザー名です。`;
  }
}

/** データベースにユーザー名 username のデータが存在しなかった場合に発生する例外 */
export class NoUserNameError extends Error {
  name = 'No username';
  message: string;
  constructor(user: string) {
    super();
    this.message = `ユーザー名 ${user} ユーザー情報は存在しません。`;
  }
}

// fetchした結果の型
type Result =
  | User
  | {
      message: string;
    };

// 該当ユーザーが存在しないとき
//   {"message":"Not Found", ...}
// のようなレスポンスがある。
const isUser = (data: Result): data is User => !('message' in data);

/** ユーザー名に対するユーザー情報が返却される。 */
export default async function getUserInfo(user: string | string[]) {
  if (typeof user === 'object') throw new InvalidUserNameError(user);

  const res = await fetch(`https://api.github.com/users/${user}`);
  const data: Result = await res.json();

  if (!isUser(data)) throw new NoUserNameError(user);

  return data;
}
