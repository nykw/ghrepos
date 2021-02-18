import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export type User = {
  login: string;
  avatar_url: string;
  email: string;
  repos_url: string;
};

export default function useUser(user: string) {
  const { data, error } = useSWR<User>(`https://api.github.com/users/${user}`, fetcher);

  return {
    data,
    isLoading: !error || !data,
    isError: error,
  };
}
