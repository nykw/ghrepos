import { FC } from 'react';
import Template from '../../components/template';
import { useRouter } from 'next/router';
import useUser, { User } from '../api/user';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

const Content = async (user: string) => {
  const { data, isLoading, isError } = useUser(user);
  if (isLoading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;
  return <div>{data}</div>;
};

const Page: FC = () => {
  const router = useRouter();
  const { user } = router.query;
  return <Template title={`${user}'s Page`}>{Content(user as string)}</Template>;
};

export default Page;
