import { FC } from 'react';
import Template from '../../components/template';
import useUser, { User } from '../../hooks/useUser';
import { GetServerSideProps } from 'next';

type Props = User & {
  name: string;
  followers: number;
  following: number;
  email: string | undefined;
  location: string | undefined;
  twitter_username: string | undefined;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  if (!params)
    return {
      notFound: true,
    };

  const { user } = params;
  if (!user)
    return {
      notFound: true,
    };

  const data = await useUser(user as string);
  if (!data)
    return {
      notFound: true,
    };

  return {
    props: data,
  };
};

const Page: FC<Props> = ({ name, followers, following, email, location, twitter_username }) => {
  return (
    <Template title={`${name}'s Page`}>
      <p>name:{name}</p>
      <p>followers:{followers}</p>
      <p>following:{following}</p>
      <p>email:{email}</p>
      <p>location:{location}</p>
      <p>twitter_username:{twitter_username}</p>
    </Template>
  );
};

export default Page;
