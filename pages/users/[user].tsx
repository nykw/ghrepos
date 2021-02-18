import { FC } from 'react';
import Template from '../../components/template';
import getUserInfo, { User } from '../../lib/userInfo';
import getReposInfo, { Repository } from '../../lib/reposInfo';
import { GetServerSideProps } from 'next';

type Props = {
  name: string;
  followers: number;
  following: number;
  email: string | undefined;
  location: string | undefined;
  twitter_username: string | undefined;
  repos: Repository[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { params } = context;
    if (!params) throw new Error('`params` is undefined.');

    const { user } = params;
    if (!user) throw new Error('`user` is undefined.');

    const data = await getUserInfo(user as string);
    if (!data) throw new Error('`data` is undefined.');

    const { login } = data;

    const repos = await getReposInfo(login);
    if (!repos) throw new Error('`repos` is undefined.');

    return {
      props: {
        ...data,
        repos,
      },
    };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }

    return {
      notFound: true,
    };
  }
};

const Page: FC<Props> = ({
  name,
  followers,
  following,
  email,
  location,
  twitter_username,
  repos,
}) => {
  return (
    <Template title={`${name}'s Page`}>
      <p>name:{name}</p>
      <p>followers:{followers}</p>
      <p>following:{following}</p>
      <p>email:{email}</p>
      <p>location:{location}</p>
      <p>twitter_username:{twitter_username}</p>
      <ul>
        {repos.map((repos) => (
          <li>{repos.name}</li>
        ))}
      </ul>
    </Template>
  );
};

export default Page;
