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
      <div className="flex">
        <div className="float-left">
          <p>login:{login}</p>
          <p>name:{name ?? '???'}</p>
          {avatar_url && <img src={avatar_url} className="h-40 w-40"></img>}
          <p>followers:{followers}</p>
          <p>following:{following}</p>
          <p>email:{email ?? '???'}</p>
          <p>location:{location ?? '???'}</p>
          <p>
            twitter_username:
            {twitter_username ? (
              <Link href={`https://twitter.com/${twitter_username}`}>
                <a className="text-blue-700 hover:underline">@{twitter_username}</a>
              </Link>
            ) : (
              '???'
            )}
          </p>
        </div>
        <div className="bg-blue-100 rounded-md p-4 float-right mx-12">
          <p>repositories:</p>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-2">
            {repositories.map((repos) => {
              const { id, full_name, name } = repos;

              return (
                <li key={id}>
                  <Link href={`/users/${full_name}`}>
                    <a className="hover:underline text-blue-700">{name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Template>
  );
};

export default Page;
