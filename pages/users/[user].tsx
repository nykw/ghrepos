import { FC } from 'react';
import Template from '../../components/template';
import getUserInfo, { User } from '../../lib/github/userInfo';
import { InvalidUserNameError, NoUserNameError } from '../../lib/github/errors/userInfo';
import getReposInfo, { Repository } from '../../lib/github/reposInfo';
import { NoReposDataError } from '../../lib/github/errors/reposInfo';
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
    <Template title={`${login}'s Page`}>
      <div className="float">
        <div className="float container">
          <p>name:{name}</p>
          {avatar_url && <img src={avatar_url} className="float-left h-40 w-40"></img>}
          <div className="flex">
            <p>followers:{followers}</p>
            <p>following:{following}</p>
          </div>
          <p>email:{email ?? '???'}</p>
          <p>location:{location ?? '???'}</p>
          <p>twitter_username:{twitter_username ?? '???'}</p>
        </div>
        <div className="">
          <p>repositories:</p>
          <ul className="grid grid-cols-1">
            {repositories.map((repos) => {
              const { id, full_name, name } = repos;

              return (
                <li key={id}>
                  <Link href={`/users/${full_name}`}>
                    <a>{name}</a>
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
