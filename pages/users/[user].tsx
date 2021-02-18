import { FC } from 'react';
import Template from '../../components/template';
import getUserInfo, { User } from '../../lib/userInfo';
import getReposInfo, { Repository } from '../../lib/reposInfo';
import { GetServerSideProps } from 'next';

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

    // GitHubからユーザー名 `user` の情報リポジトリ名を取得する
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
  repositories,
}) => {
  return (
    <Template title={`${login}'s Page`}>
      <p>name:{name}</p>
      <p>followers:{followers}</p>
      <p>following:{following}</p>
      <p>email:{email}</p>
      <p>location:{location}</p>
      <p>twitter_username:{twitter_username}</p>
      <ul>
        {repositories.map((repos) => {
          const { id, full_name } = repos;

          return <li key={id}>{repos.name}</li>;
        })}
      </ul>
    </Template>
  );
};

export default Page;
