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

export default async function getReposInfo(login: string) {
  const res = await fetch(`https://api.github.com/users/${login}/repos`);
  const data: Repository[] | undefined = await res.json();

  if (!data) throw new Error('Repositoryの情報が存在しません。');

  return data;
}
