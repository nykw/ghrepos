// https://api.github.com/users/USER_NAME/repos APIの正常系のときにこの型の配列が返される。
export type Repository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string | undefined;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
};

type Result =
  | Repository[]
  | {
      message: string;
    };

// 該当ユーザーが存在しないとき
//   {"message":"Not Found", ...}
// のようなレスポンスがある。
const isRepositories = (data: Result): data is Repository[] => !('message' in data);

export default async function getReposInfo(login: string) {
  const res = await fetch(`https://api.github.com/users/${login}/repos`);
  const data: Result = await res.json();

  if (!isRepositories(data)) throw new Error('Repositoryの情報が存在しません。');

  return data;
}
