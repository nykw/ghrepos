import { FC } from 'react';
import Template from '../../components/molecules/template';
import getUserInfo, { User } from '../../lib/github/userInfo';
import getReposInfo, { Repository } from '../../lib/github/reposInfo';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

type Props = User & {
  repositories: Repository[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { params } = context;
    if (!params) throw new Error('`params` is undefined.');
    const { user } = params;
    if (!user) throw new Error('`user` is undefined.');

    // GitHub からユーザー名 `user` の情報を取得する
    const userInfo = await getUserInfo(user);

    // GitHubからユーザー名 `user` のリポジトリ名を取得する
    const { login } = userInfo;
    const repositories = await getReposInfo(login);

    return {
      props: {
        ...userInfo,
        repositories,
      },
    };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return {
      props: {},
      redirect: {
        destination: '/',
      },
    };
  }
};

const Page: FC<Props> = ({
  login,
  name,
  followers,
  following,
  email,
  location,
  twitter_username,
  avatar_url,
  repositories,
}) => {
  return (
    <Template pageName={`${login}'s Profile`}>
      <div className="flex-col text-center">
        <div>
          <h1 className="mt-5">{login}</h1>

          <div className="mt-5">
            <Link href={`https://github.com/${login}`}>
              <img src={avatar_url} className="h-48 w-48 rounded-full mx-auto cursor-pointer" />
            </Link>
          </div>

          <div className="mt-7">
            <h2>名前</h2>
            <p className="mt-1">{name ?? '???'}</p>
          </div>

          <div className="mt-5">
            <h2>フォロワー数</h2>
            <p className="mt-1">{followers}</p>
          </div>
          <div className="mt-5">
            <h2>フォロー数</h2>
            <p className="mt-1">{following}</p>
          </div>

          <div className="mt-5">
            <h2>メールアドレス</h2>
            <p className="mt-1">{email ?? '???'}</p>
          </div>

          <div className="mt-5">
            <h2>場所</h2>
            <p className="mt-1">{location ?? '???'}</p>
          </div>

          <div className="mt-5">
            <h2>twitter</h2>
            <p className="mt-1">
              {twitter_username ? (
                <Link href={`https://twitter.com/${twitter_username}`}>
                  <a>@{twitter_username}</a>
                </Link>
              ) : (
                '???'
              )}
            </p>
          </div>
        </div>
        <table>
          <caption className="mt-3">
            <h2>リポジトリ一覧</h2>
          </caption>
          <thead className="mt-3">
            <tr>
              <th>リポジトリ名</th>
              <th>スター数</th>
            </tr>
          </thead>
          <tbody>
            {repositories.map((repos) => {
              const { id, full_name, name, stargazers_count } = repos;

              return (
                <tr key={id}>
                  <td>
                    <Link href={`https://github.com/${full_name}`}>
                      <a>{name}</a>
                    </Link>
                  </td>
                  <td>{stargazers_count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="my-5">
        <Link href="/search">
          <div className="text-center">
            <button className="btn btn-blue">Back</button>
          </div>
        </Link>
      </div>
    </Template>
  );
};

export default Page;
